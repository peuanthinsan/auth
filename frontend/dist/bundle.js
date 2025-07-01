    const { currentOrg, profile, logout, loadProfile } = (0, import_react22.useContext)(AuthContext);
      if (profile?.id === id) {
        await loadProfile();
        const adminRoleIds = roles.filter((r2) => r2.code === "ADMIN").map((r2) => r2.id);
        const stillAdmin = profile.isSuperAdmin || roleIds.some((rid) => adminRoleIds.includes(rid));
        if (!stillAdmin) navigate("/profile");
      }
      if (profile?.id === removeUserId) {
        await loadProfile();
        navigate("/profile");
      }
