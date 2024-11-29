import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const { verifyCode, loading, email } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If there's no email in the context, navigate back to the login/signup page
    if (!email) {
      toast.error("Please log in to verify your code.");
      navigate("/login");
    }
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the verification code is entered
    if (!verificationCode) {
      toast.error("Please enter a verification code.");
      return;
    }
    // Send email and verification code for validation
    verifyCode(email, verificationCode);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm mx-auto bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Verify Code</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
              Enter the verification code
            </label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
