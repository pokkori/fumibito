import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const PAYJP_API = "https://api.pay.jp/v1";

function auth() {
  return "Basic " + Buffer.from(process.env.PAYJP_SECRET_KEY! + ":").toString("base64");
}

export async function GET(req: NextRequest) {
  const email = req.cookies.get("fumi_email")?.value;
  const subId = req.cookies.get("payjp_sub_id")?.value;

  if (!email || !subId) return NextResponse.json({ active: false });

  try {
    // PAY.JPでサブスクリプション状態をリアルタイム確認
    const res = await fetch(`${PAYJP_API}/subscriptions/${subId}`, {
      headers: { Authorization: auth() },
    });
    const sub = await res.json();

    if (sub.error || sub.status !== "active") {
      // Supabaseも更新
      if (email) {
        const supabase = getSupabaseAdmin();
        await supabase
          .from("users")
          .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
          .eq("email", email);
      }
      const resp = NextResponse.json({ active: false });
      resp.cookies.delete("fumi_email");
      resp.cookies.delete("payjp_sub_id");
      return resp;
    }

    const supabase = getSupabaseAdmin();
    const { data: user } = await supabase
      .from("users")
      .select("id, plan, status")
      .eq("email", email)
      .single();

    return NextResponse.json({ active: user?.status === "active", plan: user?.plan });
  } catch {
    return NextResponse.json({ active: false });
  }
}
