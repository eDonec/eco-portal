"use client";

import { formMachine } from "@/machines/formMachine";
import { useMachine } from "@xstate/react";
import React, { useCallback, useEffect, useMemo } from "react";

// Static constants to avoid recreation on each render
const INTERESTS = ["Technology", "Sports", "Music", "Travel", "Food"];
const STEPS = [1, 2, 3];
const STEP_LABELS = ["Personal", "Address", "Preferences"];

// Memoized input field component for better performance
const FormInput = React.memo(
  ({
    type,
    value,
    onChange,
    label,
    error,
  }: {
    type: string;
    value: string;
    onChange: (value: string) => void;
    label: string;
    error?: string;
  }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        />
        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default function ClientFormExample() {
  const [state, send] = useMachine(formMachine);

  // Load saved data on component mount
  useEffect(() => {
    send({ type: "LOAD_SAVED_DATA" });
  }, [send]);

  // Memoized event handlers to prevent recreation on each render
  const handleStep1Update = useCallback(
    (field: string, value: string) => {
      send({
        type: "UPDATE_STEP1",
        data: { [field]: value },
      });
    },
    [send]
  );

  const handleStep2Update = useCallback(
    (field: string, value: string) => {
      send({
        type: "UPDATE_STEP2",
        data: { [field]: value },
      });
    },
    [send]
  );

  const handleStep3Update = useCallback(
    (data: { preferences?: string[]; newsletter?: boolean }) => {
      send({
        type: "UPDATE_STEP3",
        data,
      });
    },
    [send]
  );

  const handleInterestChange = useCallback(
    (interest: string, checked: boolean) => {
      const preferences = state.context.formData.step3.preferences;
      const newPreferences = checked
        ? [...preferences, interest]
        : preferences.filter((p) => p !== interest);
      handleStep3Update({ preferences: newPreferences });
    },
    [state.context.formData.step3.preferences, handleStep3Update]
  );

  const handleNewsletterChange = useCallback(
    (checked: boolean) => {
      handleStep3Update({ newsletter: checked });
    },
    [handleStep3Update]
  );

  // Memoized step render functions
  const renderStep1 = useMemo(
    () => (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Step 1: Personal Information
        </h3>
        <FormInput
          type="text"
          value={state.context.formData.step1.name}
          onChange={(value) => handleStep1Update("name", value)}
          label="Name"
          error={state.context.errors.name}
        />
        <FormInput
          type="email"
          value={state.context.formData.step1.email}
          onChange={(value) => handleStep1Update("email", value)}
          label="Email"
          error={state.context.errors.email}
        />
      </div>
    ),
    [
      state.context.formData.step1.name,
      state.context.formData.step1.email,
      state.context.errors.name,
      state.context.errors.email,
      handleStep1Update,
    ]
  );

  const renderStep2 = useMemo(
    () => (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Step 2: Address Information
        </h3>
        <FormInput
          type="text"
          value={state.context.formData.step2.address}
          onChange={(value) => handleStep2Update("address", value)}
          label="Address"
          error={state.context.errors.address}
        />
        <FormInput
          type="text"
          value={state.context.formData.step2.city}
          onChange={(value) => handleStep2Update("city", value)}
          label="City"
          error={state.context.errors.city}
        />
      </div>
    ),
    [
      state.context.formData.step2.address,
      state.context.formData.step2.city,
      state.context.errors.address,
      state.context.errors.city,
      handleStep2Update,
    ]
  );

  const renderStep3 = useMemo(
    () => (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Step 3: Preferences
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Interests (select multiple)
          </label>
          <div className="space-y-2">
            {INTERESTS.map((interest) => (
              <label
                key={interest}
                className="flex items-center text-gray-900 dark:text-gray-100"
              >
                <input
                  type="checkbox"
                  checked={state.context.formData.step3.preferences.includes(
                    interest
                  )}
                  onChange={(e) =>
                    handleInterestChange(interest, e.target.checked)
                  }
                  className="mr-2 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                {interest}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="flex items-center text-gray-900 dark:text-gray-100">
            <input
              type="checkbox"
              checked={state.context.formData.step3.newsletter}
              onChange={(e) => handleNewsletterChange(e.target.checked)}
              className="mr-2 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            Subscribe to newsletter
          </label>
        </div>
      </div>
    ),
    [
      state.context.formData.step3.preferences,
      state.context.formData.step3.newsletter,
      handleInterestChange,
      handleNewsletterChange,
    ]
  );

  const renderSubmitted = useMemo(
    () => (
      <div className="text-center space-y-4">
        <div className="text-green-600 dark:text-green-400 text-6xl">✓</div>
        <h3 className="text-2xl font-semibold text-green-600 dark:text-green-400">
          Form Submitted!
        </h3>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Submitted Data:
          </h4>
          <pre className="text-sm text-left bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded border border-gray-300 dark:border-gray-600">
            {JSON.stringify(state.context.formData, null, 2)}
          </pre>
        </div>
      </div>
    ),
    [state.context.formData]
  );

  const renderCurrentStep = () => {
    switch (state.value) {
      case "step1":
        return renderStep1;
      case "step2":
        return renderStep2;
      case "step3":
        return renderStep3;
      case "submitted":
        return renderSubmitted;
      default:
        return null;
    }
  };

  // Memoized navigation handlers
  const handlePrev = useCallback(() => send({ type: "PREV" }), [send]);
  const handleNext = useCallback(() => send({ type: "NEXT" }), [send]);
  const handleReset = useCallback(() => send({ type: "RESET" }), [send]);
  const handleSubmit = useCallback(() => send({ type: "SUBMIT" }), [send]);

  // Memoized progress indicator
  const progressIndicator = useMemo(
    () => (
      <div className="mb-6">
        <div className="flex items-center">
          {STEPS.map((step) => (
            <React.Fragment key={step}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= state.context.currentStep
                    ? "bg-blue-500 dark:bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-1 ${
                    step < state.context.currentStep
                      ? "bg-blue-500 dark:bg-blue-600"
                      : "bg-gray-200 dark:bg-gray-600"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-2">
          {STEP_LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    ),
    [state.context.currentStep]
  );

  return (
    <>
      {/* Progress indicator */}
      {state.value !== "submitted" && progressIndicator}

      {/* Current step content */}
      <div className="mb-6">{renderCurrentStep()}</div>

      {/* Navigation buttons */}
      {state.value !== "submitted" && (
        <div className="flex justify-between">
          <div>
            {state.value !== "step1" && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded transition-colors"
              >
                Previous
              </button>
            )}
          </div>
          <div className="space-x-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded transition-colors"
            >
              Reset
            </button>
            {state.value === "step3" ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded transition-colors"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      {state.value === "submitted" && (
        <div className="text-center">
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors"
          >
            Start Over
          </button>
        </div>
      )}
    </>
  );
}
