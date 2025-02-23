import React, { memo, useCallback } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useActions } from "../../../hooks/useActions";

const DeleteCartItemModal = ({ showModal, closeModal, cartItemId }) => {
  const { deleteCartItemById } = useActions();

  const handleDeleteProduct = useCallback(async () => {
    const result = await deleteCartItemById(cartItemId);
    if (result.success) {
      closeModal();
      toast.success("cart item deleted successfully");
    } else {
      toast.error(result.message);
    }
  }, [cartItemId, closeModal]);

  return (
    <Modal open={showModal} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="h2">
          Confirm Deletion
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Are you sure you want to delete this cart item?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
          <Button variant="contained" color="inherit" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteProduct}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(DeleteCartItemModal);
