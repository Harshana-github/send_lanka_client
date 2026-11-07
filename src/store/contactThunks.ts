import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api";

/** Nothing else needs the message once it's sent, so this one has no slice. */
export const sendMessage = createAsyncThunk("contact/send", (message: { name: string; email: string; message: string }) => api.sendMessage(message));
