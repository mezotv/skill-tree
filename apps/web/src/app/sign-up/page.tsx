import { SignUp } from "@stackframe/stack";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us today! Create your account to get started.
          </p>
        </div>
        <SignUp
          fullPage={false}
          automaticRedirect={true}
          firstTab="magic-link"
          extraInfo={
            <p className="text-xs text-gray-500 text-center mt-4">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          }
        />
      </div>
    </div>
  );
}
