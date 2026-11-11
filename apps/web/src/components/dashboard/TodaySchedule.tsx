import type { ScheduleEvent } from "../../types";

const colors = {
  class: "bg-blue-500",
  study: "bg-indigo-500",
  work: "bg-emerald-500",
};

export default function TodaySchedule({
  events,
}: {
  events: ScheduleEvent[];
}) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h3 className="text-white font-semibold text-lg mb-6">
        Today's Schedule
      </h3>

      <div className="space-y-6">

        {events.map((event) => (
          <div key={event.id} className="flex gap-5">

            <div className="text-sm text-slate-500 w-24">
              {event.startTime}
            </div>

            <div className="flex gap-4 flex-1">

              <div className={`w-1 rounded-full ${colors[event.type]}`} />

              <div>
                <p className="text-white font-medium">
                  {event.title}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {event.startTime} - {event.endTime}
                </p>
              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}