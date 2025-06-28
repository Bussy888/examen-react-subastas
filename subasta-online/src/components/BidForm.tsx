import {
  Button,
  TextField,
  Snackbar,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { useAuction } from "../hooks/useAuction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import { useTranslation } from "react-i18next";

interface Props {
  productoId: number;
  ofertaActual: number;
}

const BidForm = ({ productoId, ofertaActual }: Props) => {
  const { ofertar } = useAuction();
  const [msg, setMsg] = useState<string | null>(null);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      monto: ofertaActual + 1,
    },
    validationSchema: Yup.object({
      monto: Yup.number()
        .required(t("amountRequired"))
        .moreThan(ofertaActual, t("mustBidMore", { amount: ofertaActual })),
    }),
    onSubmit: async (values, { resetForm }) => {
      const res = await ofertar(productoId, values.monto);
      if (!res.ok) setMsg(res.msg);
      else {
        setMsg(t("bidPlaced"));
        resetForm({ values: { monto: values.monto + 1 } });
      }
    },
  });

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mt: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <GavelRoundedIcon color="primary" />
          <Typography variant="subtitle1" fontWeight={600}>
            {t("placeYourBid")}
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              type="number"
              name="monto"
              label={t("yourBid")}
              size="small"
              value={formik.values.monto}
              onChange={formik.handleChange}
              error={formik.touched.monto && Boolean(formik.errors.monto)}
              helperText={formik.touched.monto && formik.errors.monto}
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="medium"
              sx={{ whiteSpace: "nowrap" }}
            >
              {t("bid")}
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={!!msg}
        autoHideDuration={3000}
        onClose={() => setMsg(null)}
        message={msg}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default BidForm;
