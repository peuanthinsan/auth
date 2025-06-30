  var import_react27 = __toESM(require_react());
  var import_react26 = __toESM(require_react());
  (function(_jsx71) {
    })(JSX || (JSX = _jsx71.JSX || (_jsx71.JSX = {})));
        overridesResolver: overridesResolver5 = defaultOverridesResolver(lowercaseFirstLetter(componentSlot)),
        if (componentName && overridesResolver5) {
            return overridesResolver5(props, resolvedStyleOverrides);
    const useUtilityClasses38 = () => {
      const classes = useUtilityClasses38();
  // node_modules/@mui/material/esm/Link/Link.js
  var React66 = __toESM(require_react(), 1);

  // node_modules/@mui/material/esm/Link/linkClasses.js
  function getLinkUtilityClass(slot) {
    return generateUtilityClass("MuiLink", slot);
  }
  var linkClasses = generateUtilityClasses("MuiLink", ["root", "underlineNone", "underlineHover", "underlineAlways", "button", "focusVisible"]);
  var linkClasses_default = linkClasses;

  // node_modules/@mui/material/esm/Link/getTextDecoration.js
  var getTextDecoration = ({
    theme,
    ownerState
  }) => {
    const transformedColor = ownerState.color;
    const color2 = getPath(theme, `palette.${transformedColor}.main`, false) || getPath(theme, `palette.${transformedColor}`, false) || ownerState.color;
    const channelColor = getPath(theme, `palette.${transformedColor}.mainChannel`) || getPath(theme, `palette.${transformedColor}Channel`);
    if ("vars" in theme && channelColor) {
      return `rgba(${channelColor} / 0.4)`;
    }
    return alpha(color2, 0.4);
  };
  var getTextDecoration_default = getTextDecoration;

  // node_modules/@mui/material/esm/Link/Link.js
  var import_jsx_runtime38 = __toESM(require_jsx_runtime(), 1);
  var v6Colors2 = {
    primary: true,
    secondary: true,
    error: true,
    info: true,
    success: true,
    warning: true,
    textPrimary: true,
    textSecondary: true,
    textDisabled: true
  };
  var useUtilityClasses19 = (ownerState) => {
    const {
      classes,
      component,
      focusVisible,
      underline
    } = ownerState;
    const slots = {
      root: ["root", `underline${capitalize_default(underline)}`, component === "button" && "button", focusVisible && "focusVisible"]
    };
    return composeClasses(slots, getLinkUtilityClass, classes);
  };
  var LinkRoot = styled_default2(Typography_default, {
    name: "MuiLink",
    slot: "Root",
    overridesResolver: (props, styles7) => {
      const {
        ownerState
      } = props;
      return [styles7.root, styles7[`underline${capitalize_default(ownerState.underline)}`], ownerState.component === "button" && styles7.button];
    }
  })(memoTheme_default(({
    theme
  }) => {
    return {
      variants: [{
        props: {
          underline: "none"
        },
        style: {
          textDecoration: "none"
        }
      }, {
        props: {
          underline: "hover"
        },
        style: {
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline"
          }
        }
      }, {
        props: {
          underline: "always"
        },
        style: {
          textDecoration: "underline",
          "&:hover": {
            textDecorationColor: "inherit"
          }
        }
      }, {
        props: ({
          underline,
          ownerState
        }) => underline === "always" && ownerState.color !== "inherit",
        style: {
          textDecorationColor: "var(--Link-underlineColor)"
        }
      }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color2]) => ({
        props: {
          underline: "always",
          color: color2
        },
        style: {
          "--Link-underlineColor": theme.vars ? `rgba(${theme.vars.palette[color2].mainChannel} / 0.4)` : alpha(theme.palette[color2].main, 0.4)
        }
      })), {
        props: {
          underline: "always",
          color: "textPrimary"
        },
        style: {
          "--Link-underlineColor": theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / 0.4)` : alpha(theme.palette.text.primary, 0.4)
        }
      }, {
        props: {
          underline: "always",
          color: "textSecondary"
        },
        style: {
          "--Link-underlineColor": theme.vars ? `rgba(${theme.vars.palette.text.secondaryChannel} / 0.4)` : alpha(theme.palette.text.secondary, 0.4)
        }
      }, {
        props: {
          underline: "always",
          color: "textDisabled"
        },
        style: {
          "--Link-underlineColor": (theme.vars || theme).palette.text.disabled
        }
      }, {
        props: {
          component: "button"
        },
        style: {
          position: "relative",
          WebkitTapHighlightColor: "transparent",
          backgroundColor: "transparent",
          // Reset default value
          // We disable the focus ring for mouse, touch and keyboard users.
          outline: 0,
          border: 0,
          margin: 0,
          // Remove the margin in Safari
          borderRadius: 0,
          padding: 0,
          // Remove the padding in Firefox
          cursor: "pointer",
          userSelect: "none",
          verticalAlign: "middle",
          MozAppearance: "none",
          // Reset
          WebkitAppearance: "none",
          // Reset
          "&::-moz-focus-inner": {
            borderStyle: "none"
            // Remove Firefox dotted outline.
          },
          [`&.${linkClasses_default.focusVisible}`]: {
            outline: "auto"
          }
        }
      }]
    };
  }));
  var Link2 = /* @__PURE__ */ React66.forwardRef(function Link3(inProps, ref) {
    const props = useDefaultProps2({
      props: inProps,
      name: "MuiLink"
    });
    const theme = useTheme4();
    const {
      className,
      color: color2 = "primary",
      component = "a",
      onBlur,
      onFocus,
      TypographyClasses,
      underline = "always",
      variant = "inherit",
      sx,
      ...other
    } = props;
    const [focusVisible, setFocusVisible] = React66.useState(false);
    const handleBlur = (event) => {
      if (!isFocusVisible(event.target)) {
        setFocusVisible(false);
      }
      if (onBlur) {
        onBlur(event);
      }
    };
    const handleFocus = (event) => {
      if (isFocusVisible(event.target)) {
        setFocusVisible(true);
      }
      if (onFocus) {
        onFocus(event);
      }
    };
    const ownerState = {
      ...props,
      color: color2,
      component,
      focusVisible,
      underline,
      variant
    };
    const classes = useUtilityClasses19(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(LinkRoot, {
      color: color2,
      className: clsx_default(classes.root, className),
      classes: TypographyClasses,
      component,
      onBlur: handleBlur,
      onFocus: handleFocus,
      ref,
      ownerState,
      variant,
      ...other,
      sx: [...v6Colors2[color2] === void 0 ? [{
        color: color2
      }] : [], ...Array.isArray(sx) ? sx : [sx]],
      style: {
        ...other.style,
        ...underline === "always" && color2 !== "inherit" && !v6Colors2[color2] && {
          "--Link-underlineColor": getTextDecoration_default({
            theme,
            ownerState
          })
        }
      }
    });
  });
  false ? Link2.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
     * The content of the component.
     */
    children: import_prop_types.default.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: import_prop_types.default.object,
    /**
     * @ignore
     */
    className: import_prop_types.default.string,
    /**
     * The color of the link.
     * @default 'primary'
     */
    color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["primary", "secondary", "success", "error", "info", "warning", "textPrimary", "textSecondary", "textDisabled"]), import_prop_types.default.string]),
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: elementTypeAcceptingRef_default,
    /**
     * @ignore
     */
    onBlur: import_prop_types.default.func,
    /**
     * @ignore
     */
    onFocus: import_prop_types.default.func,
    /**
     * @ignore
     */
    style: import_prop_types.default.object,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
    /**
     * `classes` prop applied to the [`Typography`](https://mui.com/material-ui/api/typography/) element.
     */
    TypographyClasses: import_prop_types.default.object,
    /**
     * Controls when the link should have an underline.
     * @default 'always'
     */
    underline: import_prop_types.default.oneOf(["always", "hover", "none"]),
    /**
     * Applies the theme typography styles.
     * @default 'inherit'
     */
    variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), import_prop_types.default.string])
  } : void 0;
  var Link_default = Link2;

  var React68 = __toESM(require_react(), 1);
  var React67 = __toESM(require_react(), 1);
  var ListContext = /* @__PURE__ */ React67.createContext({});
  var import_jsx_runtime39 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses20 = (ownerState) => {
  var List = /* @__PURE__ */ React68.forwardRef(function List2(inProps, ref) {
    const context = React68.useMemo(() => ({
    const classes = useUtilityClasses20(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(ListContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(ListRoot, {
  var React71 = __toESM(require_react(), 1);
  // node_modules/@mui/material/esm/ListItemButton/ListItemButton.js
  var React69 = __toESM(require_react(), 1);

  function getListItemButtonUtilityClass(slot) {
    return generateUtilityClass("MuiListItemButton", slot);
  }
  // node_modules/@mui/material/esm/ListItemButton/ListItemButton.js
  var import_jsx_runtime40 = __toESM(require_jsx_runtime(), 1);
  var overridesResolver2 = (props, styles7) => {
    const {
      ownerState
    } = props;
    return [styles7.root, ownerState.dense && styles7.dense, ownerState.alignItems === "flex-start" && styles7.alignItemsFlexStart, ownerState.divider && styles7.divider, !ownerState.disableGutters && styles7.gutters];
  };
  var useUtilityClasses21 = (ownerState) => {
      alignItems,
      classes,
      dense,
      disabled,
      divider,
      selected
      root: ["root", dense && "dense", !disableGutters && "gutters", divider && "divider", disabled && "disabled", alignItems === "flex-start" && "alignItemsFlexStart", selected && "selected"]
    };
    const composedClasses = composeClasses(slots, getListItemButtonUtilityClass, classes);
    return {
      ...classes,
      ...composedClasses
  var ListItemButtonRoot = styled_default2(ButtonBase_default, {
    shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
    name: "MuiListItemButton",
    overridesResolver: overridesResolver2
  })(memoTheme_default(({
    theme
  }) => ({
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    textDecoration: "none",
    minWidth: 0,
    boxSizing: "border-box",
    textAlign: "left",
    paddingTop: 8,
    paddingBottom: 8,
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shortest
    }),
    "&:hover": {
      textDecoration: "none",
      backgroundColor: (theme.vars || theme).palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    [`&.${listItemButtonClasses_default.selected}`]: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      [`&.${listItemButtonClasses_default.focusVisible}`]: {
        backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
      }
    },
    [`&.${listItemButtonClasses_default.selected}:hover`]: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    },
    [`&.${listItemButtonClasses_default.focusVisible}`]: {
      backgroundColor: (theme.vars || theme).palette.action.focus
    },
    [`&.${listItemButtonClasses_default.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity
    },
    variants: [{
      props: ({
        ownerState
      }) => ownerState.divider,
      style: {
        borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundClip: "padding-box"
      }
    }, {
      props: {
        alignItems: "flex-start"
      },
      style: {
        alignItems: "flex-start"
      }
    }, {
      props: ({
        ownerState
      }) => !ownerState.disableGutters,
      style: {
        paddingLeft: 16,
        paddingRight: 16
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.dense,
      style: {
        paddingTop: 4,
        paddingBottom: 4
      }
    }]
  })));
  var ListItemButton = /* @__PURE__ */ React69.forwardRef(function ListItemButton2(inProps, ref) {
    const props = useDefaultProps2({
      props: inProps,
      name: "MuiListItemButton"
    });
    const {
      alignItems = "center",
      autoFocus = false,
      component = "div",
      children,
      dense = false,
      disableGutters = false,
      divider = false,
      focusVisibleClassName,
      selected = false,
      className,
      ...other
    } = props;
    const context = React69.useContext(ListContext_default);
    const childContext = React69.useMemo(() => ({
      dense: dense || context.dense || false,
      alignItems,
      disableGutters
    }), [alignItems, context.dense, dense, disableGutters]);
    const listItemRef = React69.useRef(null);
    useEnhancedEffect_default2(() => {
      if (autoFocus) {
        if (listItemRef.current) {
          listItemRef.current.focus();
        } else if (false) {
          console.error("MUI: Unable to set focus to a ListItemButton whose component has not been rendered.");
        }
      }
    }, [autoFocus]);
    const ownerState = {
      ...props,
      alignItems,
      dense: childContext.dense,
      disableGutters,
      divider,
      selected
    };
    const classes = useUtilityClasses21(ownerState);
    const handleRef = useForkRef_default(listItemRef, ref);
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(ListContext_default.Provider, {
      value: childContext,
      children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(ListItemButtonRoot, {
        ref: handleRef,
        href: other.href || other.to,
        component: (other.href || other.to) && component === "div" ? "button" : component,
        focusVisibleClassName: clsx_default(classes.focusVisible, focusVisibleClassName),
        ownerState,
        className: clsx_default(classes.root, className),
        ...other,
        classes,
        children
      })
    });
  });
  false ? ListItemButton.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
     * Defines the `align-items` style property.
     * @default 'center'
     */
    alignItems: import_prop_types.default.oneOf(["center", "flex-start"]),
    /**
     * If `true`, the list item is focused during the first mount.
     * Focus will also be triggered if the value changes from false to true.
     * @default false
     */
    autoFocus: import_prop_types.default.bool,
    /**
     * The content of the component if a `ListItemSecondaryAction` is used it must
     * be the last child.
     */
    children: import_prop_types.default.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: import_prop_types.default.object,
    /**
     * @ignore
     */
    className: import_prop_types.default.string,
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: import_prop_types.default.elementType,
    /**
     * If `true`, compact vertical padding designed for keyboard and mouse input is used.
     * The prop defaults to the value inherited from the parent List component.
     * @default false
     */
    dense: import_prop_types.default.bool,
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled: import_prop_types.default.bool,
    /**
     * If `true`, the left and right padding is removed.
     * @default false
     */
    disableGutters: import_prop_types.default.bool,
    /**
     * If `true`, a 1px light border is added to the bottom of the list item.
     * @default false
     */
    divider: import_prop_types.default.bool,
    /**
     * This prop can help identify which element has keyboard focus.
     * The class name will be applied when the element gains the focus through keyboard interaction.
     * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
     * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
     * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
     * if needed.
     */
    focusVisibleClassName: import_prop_types.default.string,
    /**
     * @ignore
     */
    href: import_prop_types.default.string,
    /**
     * Use to apply selected styling.
     * @default false
     */
    selected: import_prop_types.default.bool,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
  } : void 0;
  var ListItemButton_default = ListItemButton;

  // node_modules/@mui/material/esm/ListItemSecondaryAction/ListItemSecondaryAction.js
  var React70 = __toESM(require_react(), 1);

  // node_modules/@mui/material/esm/ListItemSecondaryAction/listItemSecondaryActionClasses.js
  function getListItemSecondaryActionClassesUtilityClass(slot) {
    return generateUtilityClass("MuiListItemSecondaryAction", slot);
  }
  var listItemSecondaryActionClasses = generateUtilityClasses("MuiListItemSecondaryAction", ["root", "disableGutters"]);

  // node_modules/@mui/material/esm/ListItemSecondaryAction/ListItemSecondaryAction.js
  var import_jsx_runtime41 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses22 = (ownerState) => {
    const {
      disableGutters,
      classes
    } = ownerState;
    const slots = {
      root: ["root", disableGutters && "disableGutters"]
    };
    return composeClasses(slots, getListItemSecondaryActionClassesUtilityClass, classes);
  };
  var ListItemSecondaryActionRoot = styled_default2("div", {
    name: "MuiListItemSecondaryAction",
    slot: "Root",
    overridesResolver: (props, styles7) => {
      const {
        ownerState
      } = props;
      return [styles7.root, ownerState.disableGutters && styles7.disableGutters];
  var ListItemSecondaryAction = /* @__PURE__ */ React70.forwardRef(function ListItemSecondaryAction2(inProps, ref) {
    const context = React70.useContext(ListContext_default);
    const classes = useUtilityClasses22(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(ListItemSecondaryActionRoot, {
  var import_jsx_runtime42 = __toESM(require_jsx_runtime(), 1);
  var overridesResolver3 = (props, styles7) => {
  var useUtilityClasses23 = (ownerState) => {
    overridesResolver: overridesResolver3
  var ListItem = /* @__PURE__ */ React71.forwardRef(function ListItem2(inProps, ref) {
    const context = React71.useContext(ListContext_default);
    const childContext = React71.useMemo(() => ({
    const listItemRef = React71.useRef(null);
    const children = React71.Children.toArray(childrenProp);
    const classes = useUtilityClasses23(ownerState);
      return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(ListContext_default.Provider, {
        children: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(ListItemContainer, {
          children: [/* @__PURE__ */ (0, import_jsx_runtime42.jsx)(Root, {
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(ListContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(Root, {
        children: [children, secondaryAction && /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(ListItemSecondaryAction_default, {
      const children = React71.Children.toArray(props.children);
     * The element to display at the end of ListItem.
     */
    secondaryAction: import_prop_types.default.node,
    /**
     * The extra props for the slot components.
     * You can override the existing props or add new ones.
     *
     * @default {}
     */
    slotProps: import_prop_types.default.shape({
      root: import_prop_types.default.object
    }),
    /**
     * The components used for each slot inside.
     *
     * @default {}
     */
    slots: import_prop_types.default.shape({
      root: import_prop_types.default.elementType
    }),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
  } : void 0;
  var ListItem_default = ListItem;

  // node_modules/@mui/material/esm/ListItemIcon/ListItemIcon.js
  var React72 = __toESM(require_react(), 1);

  // node_modules/@mui/material/esm/ListItemIcon/listItemIconClasses.js
  function getListItemIconUtilityClass(slot) {
    return generateUtilityClass("MuiListItemIcon", slot);
  }
  var listItemIconClasses = generateUtilityClasses("MuiListItemIcon", ["root", "alignItemsFlexStart"]);
  var listItemIconClasses_default = listItemIconClasses;

  // node_modules/@mui/material/esm/ListItemIcon/ListItemIcon.js
  var import_jsx_runtime43 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses24 = (ownerState) => {
    const {
      alignItems,
      classes
    } = ownerState;
    const slots = {
      root: ["root", alignItems === "flex-start" && "alignItemsFlexStart"]
    };
    return composeClasses(slots, getListItemIconUtilityClass, classes);
  };
  var ListItemIconRoot = styled_default2("div", {
    name: "MuiListItemIcon",
    slot: "Root",
    overridesResolver: (props, styles7) => {
      const {
        ownerState
      } = props;
      return [styles7.root, ownerState.alignItems === "flex-start" && styles7.alignItemsFlexStart];
    }
  })(memoTheme_default(({
    theme
  }) => ({
    minWidth: 56,
    color: (theme.vars || theme).palette.action.active,
    flexShrink: 0,
    display: "inline-flex",
    variants: [{
      props: {
        alignItems: "flex-start"
      },
      style: {
        marginTop: 8
      }
    }]
  })));
  var ListItemIcon = /* @__PURE__ */ React72.forwardRef(function ListItemIcon2(inProps, ref) {
    const props = useDefaultProps2({
      props: inProps,
      name: "MuiListItemIcon"
    });
    const {
      className,
      ...other
    } = props;
    const context = React72.useContext(ListContext_default);
    const ownerState = {
      ...props,
      alignItems: context.alignItems
    };
    const classes = useUtilityClasses24(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(ListItemIconRoot, {
      className: clsx_default(classes.root, className),
      ownerState,
      ref,
      ...other
    });
  });
  false ? ListItemIcon.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
     * The content of the component, normally `Icon`, `SvgIcon`,
     * or a `@mui/icons-material` SVG icon element.
    children: import_prop_types.default.node,
     * Override or extend the styles applied to the component.
    classes: import_prop_types.default.object,
     * @ignore
    className: import_prop_types.default.string,
  var ListItemIcon_default = ListItemIcon;
  var React73 = __toESM(require_react(), 1);
  var import_jsx_runtime44 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses25 = (ownerState) => {
  var ListItemText = /* @__PURE__ */ React73.forwardRef(function ListItemText2(inProps, ref) {
    } = React73.useContext(ListContext_default);
    const classes = useUtilityClasses25(ownerState);
      primary = /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(PrimarySlot, {
      secondary = /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(SecondarySlot, {
    return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(RootSlot, {
  var React76 = __toESM(require_react(), 1);
  var React74 = __toESM(require_react(), 1);
  var import_jsx_runtime45 = __toESM(require_jsx_runtime(), 1);
  var MenuList = /* @__PURE__ */ React74.forwardRef(function MenuList2(props, ref) {
    const listRef = React74.useRef(null);
    const textCriteriaRef = React74.useRef({
    React74.useImperativeHandle(actions, () => ({
    React74.Children.forEach(children, (child, index) => {
      if (!/* @__PURE__ */ React74.isValidElement(child)) {
    const items = React74.Children.map(children, (child, index) => {
        return /* @__PURE__ */ React74.cloneElement(child, newChildProps);
    return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(List_default, {
  var React75 = __toESM(require_react(), 1);
  var import_jsx_runtime46 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses26 = (ownerState) => {
  var Popover = /* @__PURE__ */ React75.forwardRef(function Popover2(inProps, ref) {
    const paperRef = React75.useRef();
    const classes = useUtilityClasses26(ownerState);
    const getAnchorOffset = React75.useCallback(() => {
    const getTransformOrigin = React75.useCallback((elemRect) => {
    const getPositioningStyle = React75.useCallback((element) => {
    const [isPositioned, setIsPositioned] = React75.useState(open);
    const setPositioningStyles = React75.useCallback(() => {
    React75.useEffect(() => {
    React75.useEffect(() => {
    React75.useImperativeHandle(action, () => open ? {
    React75.useEffect(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(RootSlot, {
      children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(TransitionSlot, {
        children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(PaperSlot, {
  var import_jsx_runtime47 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses27 = (ownerState) => {
  var Menu = /* @__PURE__ */ React76.forwardRef(function Menu2(inProps, ref) {
    const classes = useUtilityClasses27(ownerState);
    const menuListActionsRef = React76.useRef(null);
    React76.Children.map(children, (child, index) => {
      if (!/* @__PURE__ */ React76.isValidElement(child)) {
    return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(MenuRoot, {
      children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(ListSlot, {
  var React77 = __toESM(require_react(), 1);
  var import_jsx_runtime48 = __toESM(require_jsx_runtime(), 1);
  var overridesResolver4 = (props, styles7) => {
  var useUtilityClasses28 = (ownerState) => {
    overridesResolver: overridesResolver4
  var MenuItem = /* @__PURE__ */ React77.forwardRef(function MenuItem2(inProps, ref) {
    const context = React77.useContext(ListContext_default);
    const childContext = React77.useMemo(() => ({
    const menuItemRef = React77.useRef(null);
    const classes = useUtilityClasses28(props);
    return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(ListContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(MenuItemRoot, {
  var React78 = __toESM(require_react(), 1);
  var import_jsx_runtime49 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses29 = (ownerState) => {
  var NativeSelectInput = /* @__PURE__ */ React78.forwardRef(function NativeSelectInput2(props, ref) {
    const classes = useUtilityClasses29(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(React78.Fragment, {
      children: [/* @__PURE__ */ (0, import_jsx_runtime49.jsx)(NativeSelectSelect, {
      }), props.multiple ? null : /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(NativeSelectIcon, {
  var React80 = __toESM(require_react(), 1);
  var React79 = __toESM(require_react(), 1);
  var import_jsx_runtime50 = __toESM(require_jsx_runtime(), 1);
    return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(NotchedOutlineRoot, {
      children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(NotchedOutlineLegend, {
        children: withLabel ? /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", {
          _span2 || (_span2 = /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", {
  var import_jsx_runtime51 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses30 = (ownerState) => {
  var OutlinedInput = /* @__PURE__ */ React80.forwardRef(function OutlinedInput2(inProps, ref) {
    const classes = useUtilityClasses30(props);
        label: label != null && label !== "" && fcs.required ? /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)(React80.Fragment, {
    return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(InputBase_default, {
      renderSuffix: (state) => /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(NotchedSlot, {
  var React82 = __toESM(require_react(), 1);
  var React81 = __toESM(require_react(), 1);
  var import_jsx_runtime52 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses31 = (ownerState) => {
  var SelectInput = /* @__PURE__ */ React81.forwardRef(function SelectInput2(props, ref) {
    const inputRef = React81.useRef(null);
    const displayRef = React81.useRef(null);
    const [displayNode, setDisplayNode] = React81.useState(null);
    } = React81.useRef(openProp != null);
    const [menuMinWidthState, setMenuMinWidthState] = React81.useState();
    const handleDisplayRef = React81.useCallback((node2) => {
    React81.useImperativeHandle(handleRef, () => ({
    React81.useEffect(() => {
    React81.useEffect(() => {
    React81.useEffect(() => {
    const childrenArray = React81.Children.toArray(children);
      if (!/* @__PURE__ */ React81.isValidElement(child)) {
      return /* @__PURE__ */ React81.cloneElement(child, {
      React81.useEffect(() => {
    const classes = useUtilityClasses31(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(React81.Fragment, {
      children: [/* @__PURE__ */ (0, import_jsx_runtime52.jsx)(SelectSelect, {
          _span3 || (_span3 = /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("span", {
      }), /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(SelectNativeInput, {
      }), /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(SelectIcon, {
      }), /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(Menu_default, {
  var import_jsx_runtime53 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses32 = (ownerState) => {
  var Select = /* @__PURE__ */ React82.forwardRef(function Select2(inProps, ref) {
    const classes = useUtilityClasses32(ownerState);
      standard: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(StyledInput, {
      outlined: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(StyledOutlinedInput, {
      filled: /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(StyledFilledInput, {
    return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(React82.Fragment, {
      children: /* @__PURE__ */ React82.cloneElement(InputComponent, {
  var React83 = __toESM(require_react(), 1);
  var import_jsx_runtime54 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses33 = (ownerState) => {
  var Tab = /* @__PURE__ */ React83.forwardRef(function Tab2(inProps, ref) {
    const classes = useUtilityClasses33(ownerState);
    const icon = iconProp && label && /* @__PURE__ */ React83.isValidElement(iconProp) ? /* @__PURE__ */ React83.cloneElement(iconProp, {
    return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(TabRoot, {
      children: [iconPosition === "top" || iconPosition === "start" ? /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(React83.Fragment, {
      }) : /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(React83.Fragment, {
  var React84 = __toESM(require_react(), 1);
  var import_jsx_runtime55 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses34 = (ownerState) => {
  var Toolbar = /* @__PURE__ */ React84.forwardRef(function Toolbar2(inProps, ref) {
    const classes = useUtilityClasses34(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(ToolbarRoot, {
  var React85 = __toESM(require_react(), 1);
  var import_jsx_runtime56 = __toESM(require_jsx_runtime(), 1);
  var KeyboardArrowLeft_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime56.jsx)("path", {
  var React86 = __toESM(require_react(), 1);
  var import_jsx_runtime57 = __toESM(require_jsx_runtime(), 1);
  var KeyboardArrowRight_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime57.jsx)("path", {
  var React89 = __toESM(require_react(), 1);
  var React87 = __toESM(require_react(), 1);
  var import_jsx_runtime58 = __toESM(require_jsx_runtime(), 1);
    const scrollbarHeight = React87.useRef();
    const nodeRef = React87.useRef(null);
    React87.useEffect(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime58.jsx)("div", {
  var React88 = __toESM(require_react(), 1);
  var import_jsx_runtime59 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses35 = (ownerState) => {
  var TabScrollButton = /* @__PURE__ */ React88.forwardRef(function TabScrollButton2(inProps, ref) {
    const classes = useUtilityClasses35(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(TabScrollButtonRoot, {
      children: direction === "left" ? /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(StartButtonIcon, {
      }) : /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(EndButtonIcon, {
  var import_jsx_runtime60 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses36 = (ownerState) => {
  var Tabs = /* @__PURE__ */ React89.forwardRef(function Tabs2(inProps, ref) {
    const classes = useUtilityClasses36(ownerState);
    const [mounted, setMounted] = React89.useState(false);
    const [indicatorStyle, setIndicatorStyle] = React89.useState(defaultIndicatorStyle);
    const [displayStartScroll, setDisplayStartScroll] = React89.useState(false);
    const [displayEndScroll, setDisplayEndScroll] = React89.useState(false);
    const [updateScrollObserver, setUpdateScrollObserver] = React89.useState(false);
    const [scrollerStyle, setScrollerStyle] = React89.useState({
    const tabsRef = React89.useRef(null);
    const tabListRef = React89.useRef(null);
    const handleScrollbarSizeChange = React89.useCallback((scrollbarWidth) => {
      conditionalElements2.scrollbarSizeListener = scrollable ? /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(ScrollbarSlot, {
      conditionalElements2.scrollButtonStart = showScrollButtons ? /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(ScrollButtonsSlot, {
      conditionalElements2.scrollButtonEnd = showScrollButtons ? /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(ScrollButtonsSlot, {
    React89.useEffect(() => {
    React89.useEffect(() => {
    React89.useEffect(() => {
    React89.useEffect(() => {
    React89.useEffect(() => {
    React89.useImperativeHandle(action, () => ({
    const indicator = /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(IndicatorSlot, {
    const children = React89.Children.map(childrenProp, (child) => {
      if (!/* @__PURE__ */ React89.isValidElement(child)) {
      return /* @__PURE__ */ React89.cloneElement(child, {
    return /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(RootSlot, {
      children: [conditionalElements.scrollButtonStart, conditionalElements.scrollbarSizeListener, /* @__PURE__ */ (0, import_jsx_runtime60.jsxs)(ScrollerSlot, {
        children: [/* @__PURE__ */ (0, import_jsx_runtime60.jsx)(ListSlot, {
  var React90 = __toESM(require_react(), 1);
  var import_jsx_runtime61 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses37 = (ownerState) => {
  var TextField = /* @__PURE__ */ React90.forwardRef(function TextField2(inProps, ref) {
    const classes = useUtilityClasses37(ownerState);
    const InputElement = /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(InputSlot, {
    return /* @__PURE__ */ (0, import_jsx_runtime61.jsxs)(RootSlot, {
      children: [label != null && label !== "" && /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(InputLabelSlot, {
      }), select ? /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(SelectSlot, {
      }) : InputElement, helperText && /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(FormHelperTextSlot, {
  // node_modules/@mui/icons-material/esm/AccountBalanceWallet.js
  var import_jsx_runtime62 = __toESM(require_jsx_runtime(), 1);
  var AccountBalanceWallet_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime62.jsx)("path", {
    d: "M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2zm-9-2h10V8H12zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"
  }), "AccountBalanceWallet");

  // node_modules/@mui/icons-material/esm/AccountCircle.js
  var import_jsx_runtime63 = __toESM(require_jsx_runtime(), 1);
  var AccountCircle_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime63.jsx)("path", {
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20"
  }), "AccountCircle");

  // node_modules/@mui/icons-material/esm/AdminPanelSettings.js
  var import_jsx_runtime64 = __toESM(require_jsx_runtime(), 1);
  var AdminPanelSettings_default = createSvgIcon([/* @__PURE__ */ (0, import_jsx_runtime64.jsx)("path", {
    d: "M17 11c.34 0 .67.04 1 .09V6.27L10.5 3 3 6.27v4.91c0 4.54 3.2 8.79 7.5 9.82.55-.13 1.08-.32 1.6-.55-.69-.98-1.1-2.17-1.1-3.45 0-3.31 2.69-6 6-6"
  }, "0"), /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("path", {
    d: "M17 13c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 1.38c.62 0 1.12.51 1.12 1.12s-.51 1.12-1.12 1.12-1.12-.51-1.12-1.12.5-1.12 1.12-1.12m0 5.37c-.93 0-1.74-.46-2.24-1.17.05-.72 1.51-1.08 2.24-1.08s2.19.36 2.24 1.08c-.5.71-1.31 1.17-2.24 1.17"
  }, "1")], "AdminPanelSettings");

  // node_modules/@mui/icons-material/esm/Delete.js
  var import_jsx_runtime65 = __toESM(require_jsx_runtime(), 1);
  var Delete_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime65.jsx)("path", {
    d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
  }), "Delete");

  // node_modules/@mui/icons-material/esm/Edit.js
  var import_jsx_runtime66 = __toESM(require_jsx_runtime(), 1);
  var Edit_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime66.jsx)("path", {
    d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
  }), "Edit");

  // node_modules/@mui/icons-material/esm/HowToReg.js
  var import_jsx_runtime67 = __toESM(require_jsx_runtime(), 1);
  var HowToReg_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime67.jsx)("path", {
    fillRule: "evenodd",
    d: "m9 17 3-2.94c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9zm2-5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m4.47 8.5L12 17l1.4-1.41 2.07 2.08 5.13-5.17 1.4 1.41z"
  }), "HowToReg");

  // node_modules/@mui/icons-material/esm/Lock.js
  var import_jsx_runtime68 = __toESM(require_jsx_runtime(), 1);
  var Lock_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime68.jsx)("path", {
    d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1z"
  }), "Lock");

  // node_modules/@mui/icons-material/esm/Login.js
  var import_jsx_runtime69 = __toESM(require_jsx_runtime(), 1);
  var Login_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime69.jsx)("path", {
    d: "M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8z"
  }), "Login");

  // node_modules/@mui/icons-material/esm/Logout.js
  var import_jsx_runtime70 = __toESM(require_jsx_runtime(), 1);
  var Logout_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime70.jsx)("path", {
    d: "m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
  }), "Logout");

  // node_modules/@mui/icons-material/esm/PersonAdd.js
  var import_jsx_runtime71 = __toESM(require_jsx_runtime(), 1);
  var PersonAdd_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime71.jsx)("path", {
    d: "M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m-9-2V7H4v3H1v2h3v3h2v-3h3v-2zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"
  }), "PersonAdd");

  // node_modules/@mui/icons-material/esm/SwapHoriz.js
  var import_jsx_runtime72 = __toESM(require_jsx_runtime(), 1);
  var SwapHoriz_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime72.jsx)("path", {
    d: "M6.99 11 3 15l3.99 4v-3H14v-2H6.99zM21 9l-3.99-4v3H10v2h7.01v3z"
  }), "SwapHoriz");

    return /* @__PURE__ */ import_react12.default.createElement(Box_default, null, /* @__PURE__ */ import_react12.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Login"), /* @__PURE__ */ import_react12.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, /* @__PURE__ */ import_react12.default.createElement(TextField_default, { label: "username", value: username, onChange: (e) => setUsername(e.target.value) }), /* @__PURE__ */ import_react12.default.createElement(TextField_default, { type: "password", label: "password", value: password, onChange: (e) => setPassword(e.target.value) }), /* @__PURE__ */ import_react12.default.createElement(Button_default, { variant: "contained", onClick: submit }, "Submit"), /* @__PURE__ */ import_react12.default.createElement(Link_default, { href: "/reset-password", underline: "hover" }, "Forgot password?")));
  var import_react16 = __toESM(require_react());
    (0, import_react16.useContext)(AuthContext);
    const [inviteId, setInviteId] = (0, import_react16.useState)("");
    return /* @__PURE__ */ import_react16.default.createElement(Box_default, null, /* @__PURE__ */ import_react16.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Accept Invite"), /* @__PURE__ */ import_react16.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, /* @__PURE__ */ import_react16.default.createElement(TextField_default, { label: "invite id", value: inviteId, onChange: (e) => setInviteId(e.target.value) }), /* @__PURE__ */ import_react16.default.createElement(Button_default, { variant: "contained", onClick: submit }, "Submit")));
  var import_react17 = __toESM(require_react());
    (0, import_react17.useContext)(AuthContext);
    const [toUsername, setTo] = (0, import_react17.useState)("");
    const [amount, setAmount] = (0, import_react17.useState)("");
    return /* @__PURE__ */ import_react17.default.createElement(Box_default, null, /* @__PURE__ */ import_react17.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Transfer"), /* @__PURE__ */ import_react17.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, /* @__PURE__ */ import_react17.default.createElement(TextField_default, { label: "to username", value: toUsername, onChange: (e) => setTo(e.target.value) }), /* @__PURE__ */ import_react17.default.createElement(TextField_default, { label: "amount", value: amount, onChange: (e) => setAmount(e.target.value) }), /* @__PURE__ */ import_react17.default.createElement(Button_default, { variant: "contained", onClick: submit }, "Submit")));
  var import_react18 = __toESM(require_react());
    (0, import_react18.useContext)(AuthContext);
    const [balance, setBalance] = (0, import_react18.useState)(null);
    return /* @__PURE__ */ import_react18.default.createElement(Box_default, null, /* @__PURE__ */ import_react18.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Balance"), /* @__PURE__ */ import_react18.default.createElement(Button_default, { variant: "contained", onClick: load, sx: styles6.mb2 }, "Load"), balance !== null && /* @__PURE__ */ import_react18.default.createElement(Typography_default, null, "Balance: ", balance));
  var import_react23 = __toESM(require_react());
  var import_react19 = __toESM(require_react());
    const [users, setUsers] = (0, import_react19.useState)([]);
    const [roles, setRoles] = (0, import_react19.useState)([]);
    const [addOrgId, setAddOrgId] = (0, import_react19.useState)("");
    const [addUserId, setAddUserId] = (0, import_react19.useState)("");
    const [removeOrgId, setRemoveOrgId] = (0, import_react19.useState)("");
    const [removeUserId, setRemoveUserId] = (0, import_react19.useState)("");
    (0, import_react19.useEffect)(() => {
    const addMember = async () => {
      await api_default.post(`/organizations/${addOrgId}/members`, { userId: addUserId });
      alert("member added");
    };
    const removeMember = async () => {
      await api_default.delete(`/organizations/${removeOrgId}/members/${removeUserId}`);
      alert("member removed");
    };
    const deleteUser = async (id) => {
      await api_default.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    };
    const columns = (0, import_react19.useMemo)(() => [
      { Header: "ID", accessor: "id" },
      { Header: "Email", accessor: "email" },
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Balance", accessor: "balance" },
        Cell: ({ row }) => /* @__PURE__ */ import_react19.default.createElement(
          roles.map((r2) => /* @__PURE__ */ import_react19.default.createElement(MenuItem_default, { key: r2.id, value: r2.id }, r2.code))
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => /* @__PURE__ */ import_react19.default.createElement(Button_default, { color: "error", onClick: () => deleteUser(row.original.id) }, "Delete")
    return /* @__PURE__ */ import_react19.default.createElement(Box_default, null, /* @__PURE__ */ import_react19.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Manage Users"), /* @__PURE__ */ import_react19.default.createElement(Box_default, { component: "table", ...getTableProps(), sx: styles6.table }, /* @__PURE__ */ import_react19.default.createElement(Box_default, { component: "thead" }, headerGroups.map((hg) => /* @__PURE__ */ import_react19.default.createElement(Box_default, { component: "tr", ...hg.getHeaderGroupProps() }, hg.headers.map((col) => /* @__PURE__ */ import_react19.default.createElement(Box_default, { component: "th", ...col.getHeaderProps() }, col.render("Header")))))), /* @__PURE__ */ import_react19.default.createElement(Box_default, { component: "tbody", ...getTableBodyProps() }, rows.map((row) => {
      return /* @__PURE__ */ import_react19.default.createElement(Box_default, { component: "tr", ...row.getRowProps() }, row.cells.map((cell) => /* @__PURE__ */ import_react19.default.createElement(Box_default, { component: "td", ...cell.getCellProps() }, cell.render("Cell"))));
    }))), /* @__PURE__ */ import_react19.default.createElement(Box_default, { sx: styles6.actionRow }, /* @__PURE__ */ import_react19.default.createElement(Stack_default, { direction: "row", spacing: 1, sx: { mt: 2 } }, /* @__PURE__ */ import_react19.default.createElement(TextField_default, { size: "small", label: "org id", value: addOrgId, onChange: (e) => setAddOrgId(e.target.value) }), /* @__PURE__ */ import_react19.default.createElement(TextField_default, { size: "small", label: "user id", value: addUserId, onChange: (e) => setAddUserId(e.target.value) }), /* @__PURE__ */ import_react19.default.createElement(Button_default, { variant: "contained", onClick: addMember }, "Add Member")), /* @__PURE__ */ import_react19.default.createElement(Stack_default, { direction: "row", spacing: 1, sx: { mt: 2 } }, /* @__PURE__ */ import_react19.default.createElement(TextField_default, { size: "small", label: "org id", value: removeOrgId, onChange: (e) => setRemoveOrgId(e.target.value) }), /* @__PURE__ */ import_react19.default.createElement(TextField_default, { size: "small", label: "user id", value: removeUserId, onChange: (e) => setRemoveUserId(e.target.value) }), /* @__PURE__ */ import_react19.default.createElement(Button_default, { variant: "contained", color: "error", onClick: removeMember }, "Remove Member"))));
  var import_react20 = __toESM(require_react());
    const [roles, setRoles] = (0, import_react20.useState)([]);
    const [newCode, setNewCode] = (0, import_react20.useState)("");
    const [newName, setNewName] = (0, import_react20.useState)("");
    (0, import_react20.useEffect)(() => {
    const columns = (0, import_react20.useMemo)(() => [
      { Header: "ID", accessor: "id" },
        Cell: ({ row }) => /* @__PURE__ */ import_react20.default.createElement(
        Cell: ({ row }) => /* @__PURE__ */ import_react20.default.createElement(
        Cell: ({ row }) => /* @__PURE__ */ import_react20.default.createElement(IconButton_default, { color: "error", onClick: () => deleteRole(row.original.id) }, /* @__PURE__ */ import_react20.default.createElement(Delete_default, null))
    return /* @__PURE__ */ import_react20.default.createElement(Box_default, null, /* @__PURE__ */ import_react20.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Manage Roles"), /* @__PURE__ */ import_react20.default.createElement(Box_default, { component: "table", ...getTableProps(), sx: styles6.table }, /* @__PURE__ */ import_react20.default.createElement(Box_default, { component: "thead" }, headerGroups.map((hg) => /* @__PURE__ */ import_react20.default.createElement(Box_default, { component: "tr", ...hg.getHeaderGroupProps() }, hg.headers.map((col) => /* @__PURE__ */ import_react20.default.createElement(Box_default, { component: "th", ...col.getHeaderProps() }, col.render("Header")))))), /* @__PURE__ */ import_react20.default.createElement(Box_default, { component: "tbody", ...getTableBodyProps() }, rows.map((row) => {
      return /* @__PURE__ */ import_react20.default.createElement(Box_default, { component: "tr", ...row.getRowProps() }, row.cells.map((cell) => /* @__PURE__ */ import_react20.default.createElement(Box_default, { component: "td", ...cell.getCellProps() }, cell.render("Cell"))));
    }))), /* @__PURE__ */ import_react20.default.createElement(Box_default, { sx: styles6.actionRow }, /* @__PURE__ */ import_react20.default.createElement(TextField_default, { label: "Code", size: "small", value: newCode, onChange: (e) => setNewCode(e.target.value) }), /* @__PURE__ */ import_react20.default.createElement(TextField_default, { label: "Name", size: "small", sx: styles6.ml1, value: newName, onChange: (e) => setNewName(e.target.value) }), /* @__PURE__ */ import_react20.default.createElement(Button_default, { sx: styles6.ml1, variant: "contained", onClick: createRole }, "Add")));
  var import_react21 = __toESM(require_react());
    const [orgs, setOrgs] = (0, import_react21.useState)([]);
    const [newName, setNewName] = (0, import_react21.useState)("");
    (0, import_react21.useEffect)(() => {
    const createOrg = async () => {
      const res = await api_default.post("/organizations", { name: newName });
      setOrgs([...orgs, { id: res.data.orgId, name: newName, members: 1, invites: 0 }]);
      setNewName("");
    };
    const deleteOrg = async (id) => {
      await api_default.delete(`/organizations/${id}`);
      setOrgs(orgs.filter((o) => o.id !== id));
    };
    const columns = (0, import_react21.useMemo)(() => [
        Cell: ({ row }) => /* @__PURE__ */ import_react21.default.createElement(
      { Header: "Members", accessor: "members" },
      { Header: "Invites", accessor: "invites" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => /* @__PURE__ */ import_react21.default.createElement(Button_default, { color: "error", onClick: () => deleteOrg(row.original.id) }, "Delete")
      }
    return /* @__PURE__ */ import_react21.default.createElement(Box_default, null, /* @__PURE__ */ import_react21.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Manage Organizations"), /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "table", ...getTableProps(), sx: styles6.table }, /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "thead" }, headerGroups.map((hg) => /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "tr", ...hg.getHeaderGroupProps() }, hg.headers.map((col) => /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "th", ...col.getHeaderProps() }, col.render("Header")))))), /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "tbody", ...getTableBodyProps() }, rows.map((row) => {
      return /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "tr", ...row.getRowProps() }, row.cells.map((cell) => /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "td", ...cell.getCellProps() }, cell.render("Cell"))));
    }))), /* @__PURE__ */ import_react21.default.createElement(Stack_default, { direction: "row", spacing: 1, sx: { mt: 2 } }, /* @__PURE__ */ import_react21.default.createElement(TextField_default, { size: "small", label: "name", value: newName, onChange: (e) => setNewName(e.target.value) }), /* @__PURE__ */ import_react21.default.createElement(Button_default, { variant: "contained", onClick: createOrg }, "Create Organization")));
  var import_react22 = __toESM(require_react());
    const [invites, setInvites] = (0, import_react22.useState)([]);
    const [orgId, setOrgId] = (0, import_react22.useState)("");
    const [email, setEmail] = (0, import_react22.useState)("");
    const [viewOrgId, setViewOrgId] = (0, import_react22.useState)("");
    const [orgInvites, setOrgInvites] = (0, import_react22.useState)([]);
    (0, import_react22.useEffect)(() => {
    const sendInvite = async () => {
      await api_default.post(`/organizations/${orgId}/invite`, { email });
      alert("invite sent");
    };
    const loadOrgInvites = async () => {
      const res = await api_default.get(`/organizations/${viewOrgId}/invites`);
      setOrgInvites(res.data);
    };
    const columns = (0, import_react22.useMemo)(() => [
      { Header: "ID", accessor: "id" },
      { Header: "Token", accessor: "token" },
        Cell: ({ row }) => /* @__PURE__ */ import_react22.default.createElement(IconButton_default, { color: "error", onClick: () => deleteInvite(row.original.id) }, /* @__PURE__ */ import_react22.default.createElement(Delete_default, null))
    return /* @__PURE__ */ import_react22.default.createElement(Box_default, null, /* @__PURE__ */ import_react22.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Manage Invites"), /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "table", ...getTableProps(), sx: styles6.table }, /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "thead" }, headerGroups.map((hg) => /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "tr", ...hg.getHeaderGroupProps() }, hg.headers.map((col) => /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "th", ...col.getHeaderProps() }, col.render("Header")))))), /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "tbody", ...getTableBodyProps() }, rows.map((row) => {
      return /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "tr", ...row.getRowProps() }, row.cells.map((cell) => /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "td", ...cell.getCellProps() }, cell.render("Cell"))));
    }))), /* @__PURE__ */ import_react22.default.createElement(Box_default, { sx: styles6.actionRow }, /* @__PURE__ */ import_react22.default.createElement(Stack_default, { direction: "row", spacing: 1, sx: { mt: 2 } }, /* @__PURE__ */ import_react22.default.createElement(TextField_default, { size: "small", label: "org id", value: orgId, onChange: (e) => setOrgId(e.target.value) }), /* @__PURE__ */ import_react22.default.createElement(TextField_default, { size: "small", label: "email", value: email, onChange: (e) => setEmail(e.target.value) }), /* @__PURE__ */ import_react22.default.createElement(Button_default, { variant: "contained", onClick: sendInvite }, "Invite User")), /* @__PURE__ */ import_react22.default.createElement(Stack_default, { direction: "row", spacing: 1, sx: { mt: 2 } }, /* @__PURE__ */ import_react22.default.createElement(TextField_default, { size: "small", label: "org id", value: viewOrgId, onChange: (e) => setViewOrgId(e.target.value) }), /* @__PURE__ */ import_react22.default.createElement(Button_default, { variant: "contained", onClick: loadOrgInvites }, "View Invites")), orgInvites.length > 0 && /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "pre", sx: { mt: 2 } }, JSON.stringify(orgInvites, null, 2))));
    const [tab, setTab] = (0, import_react23.useState)(0);
    return /* @__PURE__ */ import_react23.default.createElement(Box_default, null, /* @__PURE__ */ import_react23.default.createElement(Tabs_default, { value: tab, onChange: (_, v) => setTab(v) }, /* @__PURE__ */ import_react23.default.createElement(Tab_default, { label: "Users" }), /* @__PURE__ */ import_react23.default.createElement(Tab_default, { label: "Roles" }), /* @__PURE__ */ import_react23.default.createElement(Tab_default, { label: "Organizations" }), /* @__PURE__ */ import_react23.default.createElement(Tab_default, { label: "Invites" })), /* @__PURE__ */ import_react23.default.createElement(Box_default, { sx: styles6.actionRow }, tab === 0 && /* @__PURE__ */ import_react23.default.createElement(ManageUsers, null), tab === 1 && /* @__PURE__ */ import_react23.default.createElement(ManageRoles, null), tab === 2 && /* @__PURE__ */ import_react23.default.createElement(ManageOrganizations, null), tab === 3 && /* @__PURE__ */ import_react23.default.createElement(ManageInvites, null)));
  }

  // src/pages/ResetPassword.js
  var import_react24 = __toESM(require_react());
  function ResetPassword() {
    const [username, setUsername] = (0, import_react24.useState)("");
    const [password, setPassword] = (0, import_react24.useState)("");
    const submit = async () => {
      await api_default.post("/password/reset", { username, newPassword: password });
      alert("password reset");
    };
    return /* @__PURE__ */ import_react24.default.createElement(Box_default, null, /* @__PURE__ */ import_react24.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Reset Password"), /* @__PURE__ */ import_react24.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, /* @__PURE__ */ import_react24.default.createElement(TextField_default, { label: "username", value: username, onChange: (e) => setUsername(e.target.value) }), /* @__PURE__ */ import_react24.default.createElement(TextField_default, { type: "password", label: "new password", value: password, onChange: (e) => setPassword(e.target.value) }), /* @__PURE__ */ import_react24.default.createElement(Button_default, { variant: "contained", onClick: submit }, "Submit")));
  }

  // src/pages/Logout.js
  var import_react25 = __toESM(require_react());
  function Logout() {
    const { logout } = (0, import_react25.useContext)(AuthContext);
    const navigate = useNavigate();
    (0, import_react25.useEffect)(() => {
      logout();
      navigate("/");
    }, []);
    return null;
    const loggedOutNav = [
      { text: "Register", path: "/register", icon: /* @__PURE__ */ import_react26.default.createElement(PersonAdd_default, null) },
      { text: "Login", path: "/login", icon: /* @__PURE__ */ import_react26.default.createElement(Login_default, null) }
    const loggedInNav = [
      { text: "Profile", path: "/profile", icon: /* @__PURE__ */ import_react26.default.createElement(AccountCircle_default, null) },
      { text: "Update Profile", path: "/update-profile", icon: /* @__PURE__ */ import_react26.default.createElement(Edit_default, null) },
      { text: "Change Password", path: "/change-password", icon: /* @__PURE__ */ import_react26.default.createElement(Lock_default, null) },
      { text: "Accept Invite", path: "/accept-invite", icon: /* @__PURE__ */ import_react26.default.createElement(HowToReg_default, null) },
      { text: "Transfer", path: "/transfer", icon: /* @__PURE__ */ import_react26.default.createElement(SwapHoriz_default, null) },
      { text: "Balance", path: "/balance", icon: /* @__PURE__ */ import_react26.default.createElement(AccountBalanceWallet_default, null) },
      { text: "Administration", path: "/admin", icon: /* @__PURE__ */ import_react26.default.createElement(AdminPanelSettings_default, null) },
      { text: "Logout", path: "/logout", icon: /* @__PURE__ */ import_react26.default.createElement(Logout_default, null) }
    ];
    const { token: token2, currentOrg, setCurrentOrg } = (0, import_react26.useContext)(AuthContext);
    const navItems = token2 ? loggedInNav : loggedOutNav;
    const [orgs, setOrgs] = (0, import_react26.useState)([]);
    (0, import_react26.useEffect)(() => {
    return /* @__PURE__ */ import_react26.default.createElement(BrowserRouter, null, /* @__PURE__ */ import_react26.default.createElement(Box_default, { sx: styles6.root }, /* @__PURE__ */ import_react26.default.createElement(CssBaseline_default, null), /* @__PURE__ */ import_react26.default.createElement(AppBar_default, { position: "fixed", sx: styles6.appBar }, /* @__PURE__ */ import_react26.default.createElement(Toolbar_default, null, /* @__PURE__ */ import_react26.default.createElement(Typography_default, { variant: "h6", noWrap: true, component: "div", sx: { flexGrow: 1 } }, "Auth Dashboard"), token2 && /* @__PURE__ */ import_react26.default.createElement(FormControl_default, { size: "small", sx: { minWidth: 120 } }, /* @__PURE__ */ import_react26.default.createElement(InputLabel_default, { id: "org-select-label" }, "Org"), /* @__PURE__ */ import_react26.default.createElement(
      orgs.map((o) => /* @__PURE__ */ import_react26.default.createElement(MenuItem_default, { key: o.id, value: o.id }, o.name))
    )))), /* @__PURE__ */ import_react26.default.createElement(
      /* @__PURE__ */ import_react26.default.createElement(Toolbar_default, null),
      /* @__PURE__ */ import_react26.default.createElement(List_default, null, navItems.map((item) => /* @__PURE__ */ import_react26.default.createElement(ListItem_default, { disablePadding: true, key: item.text }, /* @__PURE__ */ import_react26.default.createElement(ListItemButton_default, { component: Link, to: item.path }, /* @__PURE__ */ import_react26.default.createElement(ListItemIcon_default, null, item.icon), /* @__PURE__ */ import_react26.default.createElement(ListItemText_default, { primary: item.text })))))
    ), /* @__PURE__ */ import_react26.default.createElement(Box_default, { component: "main", sx: styles6.content }, /* @__PURE__ */ import_react26.default.createElement(Toolbar_default, null), /* @__PURE__ */ import_react26.default.createElement(Routes, null, /* @__PURE__ */ import_react26.default.createElement(Route, { path: "/register", element: /* @__PURE__ */ import_react26.default.createElement(Register, null) }), /* @__PURE__ */ import_react26.default.createElement(Route, { path: "/login", element: /* @__PURE__ */ import_react26.default.createElement(Login, null) }), /* @__PURE__ */ import_react26.default.createElement(Route, { path: "/profile", element: /* @__PURE__ */ import_react26.default.createElement(Profile, null) }), /* @__PURE__ */ import_react26.default.createElement(Route, { path: "/update-profile", element: /* @__PURE__ */ import_react26.default.createElement(UpdateProfile, null) }), /* @__PURE__ */ import_react26.default.createElement(Route, { path: "/change-password", element: /* @__PURE__ */ import_react26.default.createElement(ChangePassword, null) }), /* @__PURE__ */ import_react26.default.createElement(Route, { path: "/accept-invite", element: /* @__PURE__ */ import_react26.default.createElement(AcceptInvite, null) }), /* @__PURE__ */ import_react26.default.createElement(Route, { path: "/transfer", element: /* @__PURE__ */ import_react26.default.createElement(Transfer, null) }), /* @__PURE__ */ import_react26.default.createElement(Route, { path: "/balance", element: /* @__PURE__ */ import_react26.default.createElement(Balance, null) }), /* @__PURE__ */ import_react26.default.createElement(Route, { path: "/admin", element: /* @__PURE__ */ import_react26.default.createElement(Administration, null) }), /* @__PURE__ */ import_react26.default.createElement(Route, { path: "/logout", element: /* @__PURE__ */ import_react26.default.createElement(Logout, null) }), /* @__PURE__ */ import_react26.default.createElement(Route, { path: "/reset-password", element: /* @__PURE__ */ import_react26.default.createElement(ResetPassword, null) }), /* @__PURE__ */ import_react26.default.createElement(Route, { path: "*", element: /* @__PURE__ */ import_react26.default.createElement("div", null, "Home") })))));
    /* @__PURE__ */ import_react27.default.createElement(AuthProvider, null, /* @__PURE__ */ import_react27.default.createElement(App, null))

@mui/icons-material/esm/index.js:
  (**
   * @mui/icons-material v7.2.0
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
    const [orgs, setOrgs] = (0, import_react19.useState)([]);
        const [uRes, rRes, oRes] = await Promise.all([
          api_default.get("/roles"),
          api_default.get("/organizations/all")
        setOrgs(oRes.data);
      {
        Header: "Organizations",
        accessor: "organizations",
        Cell: ({ row }) => row.original.organizations.map((o) => o.name).join(", ")
      },
    }))), /* @__PURE__ */ import_react19.default.createElement(Box_default, { sx: styles6.actionRow }, /* @__PURE__ */ import_react19.default.createElement(Stack_default, { direction: "row", spacing: 1, sx: { mt: 2 } }, /* @__PURE__ */ import_react19.default.createElement(Select_default, { size: "small", value: addOrgId, onChange: (e) => setAddOrgId(e.target.value), displayEmpty: true }, /* @__PURE__ */ import_react19.default.createElement(MenuItem_default, { value: "", disabled: true }, "Select Org"), orgs.map((o) => /* @__PURE__ */ import_react19.default.createElement(MenuItem_default, { key: o.id, value: o.id }, o.name))), /* @__PURE__ */ import_react19.default.createElement(Select_default, { size: "small", value: addUserId, onChange: (e) => setAddUserId(e.target.value), displayEmpty: true }, /* @__PURE__ */ import_react19.default.createElement(MenuItem_default, { value: "", disabled: true }, "Select User"), users.map((u) => /* @__PURE__ */ import_react19.default.createElement(MenuItem_default, { key: u.id, value: u.id }, u.username))), /* @__PURE__ */ import_react19.default.createElement(Button_default, { variant: "contained", onClick: addMember }, "Add Member")), /* @__PURE__ */ import_react19.default.createElement(Stack_default, { direction: "row", spacing: 1, sx: { mt: 2 } }, /* @__PURE__ */ import_react19.default.createElement(Select_default, { size: "small", value: removeOrgId, onChange: (e) => setRemoveOrgId(e.target.value), displayEmpty: true }, /* @__PURE__ */ import_react19.default.createElement(MenuItem_default, { value: "", disabled: true }, "Select Org"), orgs.map((o) => /* @__PURE__ */ import_react19.default.createElement(MenuItem_default, { key: o.id, value: o.id }, o.name))), /* @__PURE__ */ import_react19.default.createElement(Select_default, { size: "small", value: removeUserId, onChange: (e) => setRemoveUserId(e.target.value), displayEmpty: true }, /* @__PURE__ */ import_react19.default.createElement(MenuItem_default, { value: "", disabled: true }, "Select User"), users.map((u) => /* @__PURE__ */ import_react19.default.createElement(MenuItem_default, { key: u.id, value: u.id }, u.username))), /* @__PURE__ */ import_react19.default.createElement(Button_default, { variant: "contained", color: "error", onClick: removeMember }, "Remove Member"))));
    const [profile, setProfile] = (0, import_react26.useState)(null);
        const [oRes, pRes] = await Promise.all([
          api_default.get("/my-organizations"),
          api_default.get("/profile")
        ]);
        setOrgs(oRes.data.organizations);
        setProfile(pRes.data);
        setProfile(null);
    return /* @__PURE__ */ import_react26.default.createElement(BrowserRouter, null, /* @__PURE__ */ import_react26.default.createElement(Box_default, { sx: styles6.root }, /* @__PURE__ */ import_react26.default.createElement(CssBaseline_default, null), /* @__PURE__ */ import_react26.default.createElement(AppBar_default, { position: "fixed", sx: styles6.appBar }, /* @__PURE__ */ import_react26.default.createElement(Toolbar_default, null, /* @__PURE__ */ import_react26.default.createElement(Typography_default, { variant: "h6", noWrap: true, component: "div", sx: { flexGrow: 1 } }, "Auth Dashboard"), token2 && profile && /* @__PURE__ */ import_react26.default.createElement(Typography_default, { sx: { mr: 2 } }, profile.firstName, " ", profile.lastName, " (", profile.username, ") - Balance ", profile.balance), token2 && /* @__PURE__ */ import_react26.default.createElement(FormControl_default, { size: "small", sx: { minWidth: 120 } }, /* @__PURE__ */ import_react26.default.createElement(InputLabel_default, { id: "org-select-label" }, "Org"), /* @__PURE__ */ import_react26.default.createElement(
