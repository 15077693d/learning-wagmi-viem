"use client";
import { writeContractAndGetEventLogs } from "../utils";

export default function Page() {
  return (
    <div>
      <button
        onClick={async () => console.log(await writeContractAndGetEventLogs())}
      >
        Write Contract And Get EventLogs
      </button>
    </div>
  );
}
