"use server";

const USERNAME = "admin";
const PASSWORD = "Aa12345@";

interface LoginState {
  userInfo: {
    username: string;
    displayName: string;
  } | null;
}

export async function login(
  state: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = formData.get("username");
  const password = formData.get("password");
  if (username === USERNAME && password === PASSWORD) {
    return {
      userInfo: {
        username: username as string,
        displayName: "Sterling Ledger",
      },
    };
  }
  return {
    userInfo: null,
  };
}
