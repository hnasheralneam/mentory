import supabase from "@/utils/supabase";

async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error };
  }

  return { data: data };
}

async function signUpWithEmail(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    return { error: error };
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert([
      {
        user_id: data.user?.id,
        first_name: firstName,
        last_name: lastName,
        email: email,
      },
    ]);

  if (profileError) {
    return { error: profileError };
  }

  return { data: profileData };
}

export { signInWithEmail, signUpWithEmail };
