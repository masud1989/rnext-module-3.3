import { useState } from "react";

const Form = () => {
  // mandatory State
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  if (status === "success")
    return <h1 className="result-aria">Yah!You are Correct</h1>;

  // handlers
  const handleAnsText = (e) => {
    setError(null);
    setAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (error) {
      setStatus("typing");
      setError(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-aria">
        <h2>Capital Quiz App Bangladesh</h2>
        <p className="question">Q-1.What is the capital of Bangladesh ?</p>
        {error && <p className="Error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            value={answer}
            onChange={handleAnsText}
            disabled={status === "submitting"}
          />
          <br />

          <button
            className="submit"
            disabled={answer === "" || status === "submitting"}
          >
            Submit
          </button>
          {status === "submitting" && <p className="loading">Loading...</p>}
        </form>
      </div>
    </div>
  );
};

export default Form;

function submitForm(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== "dhaka";
      if (shouldError) {
        reject(new Error("Wrong, Try again!"));
      } else {
        resolve();
      }
    }, 1500);
  });
}
