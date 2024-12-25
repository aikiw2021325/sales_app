"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// APIのエンドポイントURL (実際のAPIに合わせて変更してください)
const API_ENDPOINT = "http://192.168.24.38:8001/chat";

// APIレスポンスの型を定義
interface ApiResponse {
  response: string;
  session_id: string;
}

// リクエストボディの型を定義
interface ApiRequestBody {
  user_input: string;
}

// ユーザーからの入力を受け取り、APIにリクエストを送信するサーバーアクション
export async function sendChatMessage(userInput: string): Promise<ApiResponse> {
  try {
    // クッキーからsession_idを取得
    // const sessionId = (await cookies()).get("session_id")?.value;

    const requestBody: ApiRequestBody = {
      user_input: userInput,
    };

    console.log(requestBody);

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      credentials: 'include',
    });

    if (!response.ok) {
      // エラーレスポンスの場合、エラーを投げる
      const errorData = await response.json();
      throw new Error(
        `API request failed with status ${response.status}: ${
          errorData?.message || "Unknown error"
        }`
      );
    }

    // 成功した場合、APIからのレスポンスを返す (必要に応じて処理してください)
    const data: ApiResponse = await response.json();

    // APIレスポンスに含まれているsession_idをクッキーに保存
    if (data.session_id) {
      const cookieStore = await cookies();
       cookieStore.set("session_id", data.session_id, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30, // 30日間保存
      });
    }
    revalidatePath("/");
    console.log(data);
    return data;
  } catch (error) {
    // エラーをログに記録し、適切なエラーメッセージを返す
    console.error("Error sending chat message:", error);
    throw new Error(`Failed to send chat message: ${error.message}`);
  }
}