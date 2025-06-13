// List of 13 feature labels (in order)
const features = [
  "CRIM", "ZN", "INDUS", "CHAS", "NOX", "RM", "AGE",
  "DIS", "RAD", "TAX", "PTRATIO", "B", "LSTAT"
];

// Dynamically create inputs
const inputContainer = document.getElementById("inputs");
features.forEach((feature, index) => {
  const input = document.createElement("input");
  input.type = "number";
  input.step = "any";
  input.name = `feature${index}`;
  input.placeholder = `${feature}`;
  input.required = true;
  inputContainer.appendChild(input);
});

// Handle form submission
document.getElementById("prediction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const values = [];
  features.forEach((_, index) => {
    const val = parseFloat(document.querySelector(`[name="feature${index}"]`).value);
    values.push(val);
  });

  fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ features: values })
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("result").innerText = `Predicted House Price: $${data.prediction.toFixed(2)}`;
    })
    .catch(error => {
      document.getElementById("result").innerText = "Error predicting price.";
      console.error("Prediction error:", error);
    });
});
