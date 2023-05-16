import SignUpForm from "../../component/SignUpForm/SignUpForm";

type Props = {
  setUser: (a: { username: string; email: string }) => void;
};

export default function AuthPage({ setUser }: Props) {
  return (
    <div>
      <h1>AuthPage</h1>
      <SignUpForm setUser={setUser} />
    </div>
  );
}
