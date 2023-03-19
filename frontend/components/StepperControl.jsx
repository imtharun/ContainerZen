const StepperControl = ({ handleClick, currentStep, steps }) => {
  return (
    <div className="container mt-4 mb-8 flex justify-around">
      <button
        onClick={() => handleClick()}
        type="button"
        className={`inline-block rounded bg-light text-dark py-2 px-4 text-lg font-medium hover:opacity-50 ${
          currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
        }`}
      >
        Back
      </button>

      <button
        onClick={() => handleClick("next")}
        className="inline-block rounded bg-light text-dark py-2 px-4 text-lg font-medium hover:opacity-50"
      >
        {currentStep === steps.length ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;
