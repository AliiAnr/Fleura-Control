import { AdminsStatus } from "@/types/api";

export function adminReviewStatusConv(status: AdminsStatus) {
  if (status == AdminsStatus.ACCEPTED) {
    return "Accepted";
  } else if (status == AdminsStatus.REJECTED) {
    return "Rejected";
  } else {
    return "Need Review";
  }
}
