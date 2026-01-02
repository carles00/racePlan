import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "../lib/authClient";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const signup = async () => {
    await authClient.signUp.email({
      name: "John Doe", // required
      email: "john.doe@example.com", // required
      password: "password1234", // required
      callbackURL: "http://localhost:5173/callback",
    });
    
  };
  return (
    <div className="flex flex-col p-2">
      <h3>Welcome Home!</h3>
      <button onClick={signup}>Sign up</button>
    </div>
  );
}
