import supabase from "@/utils/supabase";

async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
    throw new Error(error.message);
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert([
      { id: data.user?.id, first_name: firstName, last_name: lastName, email: email },
    ]);
  if (profileError) {
    throw new Error(profileError.message);
  }

  return profileData;
}

export { signInWithEmail, signUpWithEmail };
