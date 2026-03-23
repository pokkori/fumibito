import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const PAYJP_API = "https://api.pay.jp/v1";

function auth() {
  return "Basic " + Buffer.from(process.env.PAYJP_SECRET_KEY! + ":").toString("base64");
}

async function payjpPost(path: string, body: Record<string, string>) {
  const res = await fetch(`${PAYJP_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: auth(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body).toString(),
  });
  return res.json();
}

const PLANS: Record<string, string> = {
  standard: process.env.PAYJP_PLAN_STD!,
  premium: process.env.PAYJP_PLAN_PREMIUM!,
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token, plan, email, name, birthday, interests, worry, tone, postal_code, address, address_name } = body;

  if (!token) return NextResponse.json({ error: "No token" }, { status: 400 });
  if (!email || !name || !postal_code || !address || !address_name) {
    return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
  }

  const planKey = plan ?? "standard";
  const planId = PLANS[planKey];
  if (!planId) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

  try {
    const customer = await payjpPost("/customers", { card: token, email });
    if (customer.error) {
      return NextResponse.json({ error: customer.error.message }, { status: 400 });
    }

    const sub = await payjpPost("/subscriptions", {
      customer: customer.id,
      plan: planId,
    });
    if (sub.error) {
      return NextResponse.json({ error: sub.error.message }, { status: 400 });
    }

    // Supabaseに保存
    const supabase = getSupabaseAdmin();

    // upsert user
    const { data: user, error: userErr } = await supabase
      .from("users")
      .upsert(
        {
          email,
          payjp_customer_id: customer.id,
          payjp_sub_id: sub.id,
          plan: planKey,
          status: "active",
        },
        { onConflict: "email" }
      )
      .select("id")
      .single();

    if (userErr || !user) {
      console.error("Supabase user upsert error:", userErr);
      return NextResponse.json({ error: "登録に失敗しました" }, { status: 500 });
    }

    // upsert profile
    const interestArr = interests ? interests.split(",").filter(Boolean) : [];
    await supabase.from("profiles").upsert(
      {
        user_id: user.id,
        name,
        birthday: birthday || null,
        postal_code,
        address,
        address_name,
        interests: interestArr,
        worry: worry || null,
        tone: tone || "warm",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    const res = NextResponse.json({ ok: true });
    // emailをCookieに保存（認証代わり）
    res.cookies.set("fumi_email", email, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 366,
      path: "/",
    });
    res.cookies.set("payjp_sub_id", sub.id, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 366,
      path: "/",
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "決済処理に失敗しました" }, { status: 500 });
  }
}
