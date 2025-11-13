import { Box, Typography } from "@mui/material";

export default function ProgressBar({ pendingCount, inProgressCount, completedCount }) {
  const total = pendingCount + inProgressCount + completedCount;
  const pending = total === 0 ? 0 : (pendingCount / total) * 100;
  const inProgress = total === 0 ? 0 : (inProgressCount / total) * 100;
  const completed = total === 0 ? 0 : (completedCount / total) * 100;

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      {/* Label */}
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Typography sx={{ color: "black" }}>Progress</Typography>
      </Box>

      {/* Progress Bar */}
      <Box
        sx={{
          flex: 7,
          height: 20,
          borderRadius: 10,
          overflow: "hidden",
          display: "flex",
          backgroundColor: "#E0E0E0",
          mx: "auto",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: 12,
        }}
      >
        {/* Pending */}
        {pending > 0 && (
          <Box
            sx={{
              width: `${pending}%`,
              backgroundColor: "#FFA726",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Pending
          </Box>
        )}

        {/* In Progress */}
        {inProgress > 0 && (
          <Box
            sx={{
              width: `${inProgress}%`,
              backgroundColor: "#42A5F5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            In Progress
          </Box>
        )}

        {/* Completed */}
        {completed > 0 && (
          <Box
            sx={{
              width: `${completed}%`,
              backgroundColor: "#66BB6A",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Completed
          </Box>
        )}
      </Box>

      {/* Summary */}
      <Box sx={{ flex: 2, textAlign: "center" }}>
        <Typography sx={{ color: "black", fontWeight: "bold" }}>
          Completed ({completedCount}/{total})
        </Typography>
      </Box>
    </Box>
  );
}
