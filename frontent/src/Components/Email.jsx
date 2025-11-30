import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

const Home = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setAlertType("error");
      setMessage("Please enter a valid email!");
      setOpen(true);
      return;
    }

    setLoading(true); // ⬅️ Email send aagum pothu loading start!
    try {
      const response = await axios.post(
        "https://multiple-email-send.onrender.com/api/send-email",
        { email }
      );

      setAlertType("success");
      setMessage(response.data.message);
      setEmail("");
      setOpen(true);
    } catch (error) {
      setAlertType("error");
      setMessage("Failed to send email!");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Subscribe to Our Newsletter
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 w-64 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />

        <Button
          type="submit"
          loading={loading}
          loadingIndicator="Loading..."
          variant="outlined"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Submit
        </Button>
      </form>

      {/* Snackbar Component */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
