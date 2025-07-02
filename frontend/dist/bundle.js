    const { currentOrg, profile, logout, loadProfile } = (0, import_react22.useContext)(AuthContext);
      if (profile?.id === id) {
        await loadProfile();
      }
      if (profile?.id === removeUserId) {
        await loadProfile();
        navigate("/profile");
      }
