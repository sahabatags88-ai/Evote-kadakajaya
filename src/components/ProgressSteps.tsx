import React from 'react';
import { Check, Users } from 'lucide-react';
import { SIMULATION_STEPS } from '../data/mockData';

interface ProgressStepsProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
  onStepClick,
}) => {
  const currentStepData = SIMULATION_STEPS[currentStep - 1] || SIMULATION_STEPS[0];

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-slate-200/90 p-3 sm:p-4 mb-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left Side: Step Stage Indicator Pill (as seen in referensi-tampilan.png) */}
        <div className="flex items-center gap-3 bg-[#0a275a] text-white px-4 py-2.5 rounded-2xl shadow-md shrink-0 w-full lg:w-auto">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-sky-200 uppercase tracking-wider">
              TAHAP {currentStep} DARI 8
            </div>
            <div className="text-sm font-black text-white uppercase tracking-tight">
              {currentStepData.shortTitle}
            </div>
          </div>
        </div>

        {/* Right Side: 8 Step Timeline (as seen in referensi-tampilan.png) */}
        <div className="w-full flex-1 flex items-center justify-between relative px-2 sm:px-6">
          {/* Background Connecting Line */}
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 z-0 hidden sm:block" />

          {SIMULATION_STEPS.map((s) => {
            const isCompleted = s.step < currentStep;
            const isCurrent = s.step === currentStep;

            return (
              <div
                key={s.step}
                className="relative z-10 flex flex-col items-center group select-none"
              >
                <button
                  type="button"
                  disabled={s.step > currentStep}
                  onClick={() => {
                    if (onStepClick && s.step <= currentStep) {
                      onStepClick(s.step);
                    }
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-[#0a275a] text-white ring-4 ring-blue-500/30 shadow-md scale-110'
                      : 'bg-slate-300 text-slate-600 cursor-not-allowed'
                  }`}
                  title={`${s.step}. ${s.shortTitle}`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span>{s.step}</span>
                  )}
                </button>

                {/* Step label text below icon */}
                <div className="mt-1 text-center hidden md:block max-w-[75px]">
                  <p
                    className={`text-[10px] font-bold leading-tight ${
                      isCurrent
                        ? 'text-blue-900 font-extrabold'
                        : isCompleted
                        ? 'text-slate-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {s.shortTitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
