import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";

const SummaryPage = () => {
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          gutterBottom={true}
          color={"grey"}
          component={"span"}
          sx={{ fontWeight: "bold" }}
        >
          Summary
        </Typography>
      </Box>
      <Divider />
      <Stack spacing={2} direction="column">
        <Stack direction={"row"} justifyContent={"space-between"} px={2} pt={1}>
          <Typography variant="h6" color={"grey"} component={"span"}>
            Products :
          </Typography>
          <Typography variant="h6" color={"grey"} component={"span"}>
            2000
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} px={2} py={1}>
          <Typography variant="h6" color={"grey"} component={"span"}>
            Tax [ 5% ]:
          </Typography>
          <Typography variant="h6" color={"grey"} component={"span"}>
            500$
          </Typography>
        </Stack>
        <Divider />
        <Stack direction={"row"} justifyContent={"space-between"} px={2} py={1}>
          <Typography variant="h6"  component={"span"}>
            Coupen code :
          </Typography>
          <Typography variant="h6"  component={"span"} sx={{ fontWeight: "bold" }}>
            5000$
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} px={2} py={1}>
          <Typography variant="h6"  component={"span"}>
            Discount price :
          </Typography>
          <Typography variant="h6"  component={"span"} sx={{ fontWeight: "bold" }}>
            5000$
          </Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} px={2} py={1}>
          <Typography variant="h6"  component={"span"}>
            Total Amount :
          </Typography>
          <Typography variant="h6"  component={"span"} sx={{ fontWeight: "bold" }}>
            5000$
          </Typography>
        </Stack>
        <Divider />
      </Stack>
    </>
  );
};

export default SummaryPage;
