    const { loadProfile, profile, logout } = (0, import_react16.useContext)(AuthContext);
    ), /* @__PURE__ */ import_react16.default.createElement(Button_default, { type: "submit", variant: "contained" }, "Submit"), /* @__PURE__ */ import_react16.default.createElement(
      Button_default,
      {
        variant: "outlined",
        color: "error",
        onClick: async () => {
          if (!window.confirm("Delete your account?")) return;
          try {
            await api_default.delete("/profile");
            showToast("Account deleted", "success");
            await logout();
            navigate("/register");
          } catch (err) {
            showToast(err.response?.data?.message || "Delete failed", "error");
          }
        }
      },
      "Delete Account"
    )));
