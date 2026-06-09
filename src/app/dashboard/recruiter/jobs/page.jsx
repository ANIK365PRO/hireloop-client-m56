
import { getCompanyJObs } from "@/lib/api/jobs";
import { Chip, Table } from "@heroui/react";
import { Eye, Pencil, Trash2, MapPin, Wifi } from "lucide-react";
import Link from "next/link";

// ── helpers ──────────────────────────────────────────────

function formatDeadline(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function isExpired(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

const TYPE_CHIP = {
  "full-time":  { color: "primary", label: "Full-time"  },
  "part-time":  { color: "accent",  label: "Part-time"  },
  "contract":   { color: "warning", label: "Contract"   },
  "internship": { color: "default", label: "Internship" },
};

const STATUS_CHIP = {
  "active":   { color: "success", label: "Active"   },
  "inactive": { color: "danger",  label: "Inactive" },
  "draft":    { color: "default", label: "Draft"    },
};

// ── component ─────────────────────────────────────────────

const RecruiterJobs = async () => {
  const companyId = "company_123"; // todo: replace with real company id
  const jobs = await getCompanyJObs(companyId);
  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Listings</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {jobs?.length ?? 0} job{jobs?.length !== 1 ? "s" : ""} posted
          </p>
        </div>
        <Link
          href="/dashboard/recruiter/jobs/new"
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          + Post New Job
        </Link>
      </div>

      {/* Table card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {!jobs?.length ? (
          <div className="py-16 text-center text-sm text-gray-400">
            No jobs found. Post your first job to get started.
          </div>
        ) : (
          <Table aria-label="Company job listings">
            <Table.ResizableContainer>
              <Table.Content aria-label="Jobs" className="min-w-[700px]">

                <Table.Header>
                  <Table.Column isRowHeader defaultWidth="2fr" id="title" minWidth={200}>
                    Job Title
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1fr" id="type" minWidth={120}>
                    Type
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1fr" id="location" minWidth={130}>
                    Location
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1fr" id="deadline" minWidth={130}>
                    Deadline
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="1fr" id="status" minWidth={110}>
                    Status
                    <Table.ColumnResizer />
                  </Table.Column>
                  <Table.Column defaultWidth="120px" id="actions" minWidth={120}>
                    Actions
                  </Table.Column>
                </Table.Header>

                {/* ✅ plain .map() — no items prop, no render function */}
                <Table.Body>
                  {jobs.map((job) => (
                    <Table.Row key={job._id}>

                      {/* Title + category */}
                      <Table.Cell>
                        <p className="font-medium text-gray-900 leading-snug line-clamp-1">
                          {job.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{job.category}</p>
                      </Table.Cell>

                      {/* Type chip */}
                      <Table.Cell>
                        {(() => {
                          const t = TYPE_CHIP[job.type] ?? { color: "default", label: job.type };
                          return (
                            <Chip color={t.color} variant="soft" size="sm">
                              {t.label}
                            </Chip>
                          );
                        })()}
                      </Table.Cell>

                      {/* Location */}
                      <Table.Cell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          {job.location?.remote ? (
                            <>
                              <Wifi size={13} className="text-blue-500 shrink-0" />
                              <span>Remote</span>
                            </>
                          ) : (
                            <>
                              <MapPin size={13} className="text-gray-400 shrink-0" />
                              <span className="line-clamp-1">
                                {[job.location?.city, job.location?.country]
                                  .filter(Boolean)
                                  .join(", ") || "—"}
                              </span>
                            </>
                          )}
                        </div>
                      </Table.Cell>

                      {/* Deadline */}
                      <Table.Cell>
                        <span className={`text-sm ${isExpired(job.applicationDeadline) ? "text-red-500" : "text-gray-700"}`}>
                          {formatDeadline(job.applicationDeadline)}
                        </span>
                      </Table.Cell>

                      {/* Status chip */}
                      <Table.Cell>
                        {(() => {
                          const s = STATUS_CHIP[job.status] ?? { color: "default", label: job.status };
                          return (
                            <Chip color={s.color} variant="soft" size="sm">
                              {s.label}
                            </Chip>
                          );
                        })()}
                      </Table.Cell>

                      {/* Actions — Link wrapping icon, no client handlers needed */}
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/recruiter/jobs/${job._id}`}
                            aria-label="View job details"
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            href={`/dashboard/recruiter/jobs/${job._id}/edit`}
                            aria-label="Edit job"
                            className="text-gray-400 hover:text-amber-600 transition-colors"
                          >
                            <Pencil size={16} />
                          </Link>
                          <Link
                            href={`/dashboard/recruiter/jobs/${job._id}/delete`}
                            aria-label="Delete job"
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </Link>
                        </div>
                      </Table.Cell>

                    </Table.Row>
                  ))}
                </Table.Body>

              </Table.Content>
            </Table.ResizableContainer>
          </Table>
        )}
      </div>

    </div>
  );
};

export default RecruiterJobs;