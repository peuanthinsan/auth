  var import_react30 = __toESM(require_react());
  var import_react29 = __toESM(require_react());
  (function(_jsx88) {
    })(JSX || (JSX = _jsx88.JSX || (_jsx88.JSX = {})));
    const useUtilityClasses46 = () => {
      const classes = useUtilityClasses46();
  // node_modules/@mui/material/esm/Alert/Alert.js
  var React44 = __toESM(require_react(), 1);

  // node_modules/@mui/material/esm/Alert/alertClasses.js
  function getAlertUtilityClass(slot) {
    return generateUtilityClass("MuiAlert", slot);
  }
  var alertClasses = generateUtilityClasses("MuiAlert", ["root", "action", "icon", "message", "filled", "colorSuccess", "colorInfo", "colorWarning", "colorError", "filledSuccess", "filledInfo", "filledWarning", "filledError", "outlined", "outlinedSuccess", "outlinedInfo", "outlinedWarning", "outlinedError", "standard", "standardSuccess", "standardInfo", "standardWarning", "standardError"]);
  var alertClasses_default = alertClasses;

  // node_modules/@mui/material/esm/internal/svg-icons/SuccessOutlined.js
  var SuccessOutlined_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime18.jsx)("path", {
    d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
  }), "SuccessOutlined");

  // node_modules/@mui/material/esm/internal/svg-icons/ReportProblemOutlined.js
  var React40 = __toESM(require_react(), 1);
  var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);
  var ReportProblemOutlined_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime19.jsx)("path", {
    d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
  }), "ReportProblemOutlined");

  // node_modules/@mui/material/esm/internal/svg-icons/ErrorOutline.js
  var React41 = __toESM(require_react(), 1);
  var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
  var ErrorOutline_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime20.jsx)("path", {
    d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  }), "ErrorOutline");

  // node_modules/@mui/material/esm/internal/svg-icons/InfoOutlined.js
  var React42 = __toESM(require_react(), 1);
  var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);
  var InfoOutlined_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", {
    d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
  }), "InfoOutlined");

  // node_modules/@mui/material/esm/internal/svg-icons/Close.js
  var React43 = __toESM(require_react(), 1);
  var import_jsx_runtime22 = __toESM(require_jsx_runtime(), 1);
  var Close_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime22.jsx)("path", {
  // node_modules/@mui/material/esm/Alert/Alert.js
  var import_jsx_runtime23 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses6 = (ownerState) => {
    const {
      variant,
      color: color2,
      severity,
      classes
    } = ownerState;
    const slots = {
      root: ["root", `color${capitalize_default(color2 || severity)}`, `${variant}${capitalize_default(color2 || severity)}`, `${variant}`],
      icon: ["icon"],
      message: ["message"],
      action: ["action"]
    };
    return composeClasses(slots, getAlertUtilityClass, classes);
  };
  var AlertRoot = styled_default2(Paper_default, {
    name: "MuiAlert",
    slot: "Root",
    overridesResolver: (props, styles7) => {
      const {
        ownerState
      } = props;
      return [styles7.root, styles7[ownerState.variant], styles7[`${ownerState.variant}${capitalize_default(ownerState.color || ownerState.severity)}`]];
    }
  })(memoTheme_default(({
    theme
  }) => {
    const getColor = theme.palette.mode === "light" ? darken : lighten;
    const getBackgroundColor = theme.palette.mode === "light" ? lighten : darken;
    return {
      ...theme.typography.body2,
      backgroundColor: "transparent",
      display: "flex",
      padding: "6px 16px",
      variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color2]) => ({
        props: {
          colorSeverity: color2,
          variant: "standard"
        },
        style: {
          color: theme.vars ? theme.vars.palette.Alert[`${color2}Color`] : getColor(theme.palette[color2].light, 0.6),
          backgroundColor: theme.vars ? theme.vars.palette.Alert[`${color2}StandardBg`] : getBackgroundColor(theme.palette[color2].light, 0.9),
          [`& .${alertClasses_default.icon}`]: theme.vars ? {
            color: theme.vars.palette.Alert[`${color2}IconColor`]
          } : {
            color: theme.palette[color2].main
          }
        }
      })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color2]) => ({
        props: {
          colorSeverity: color2,
          variant: "outlined"
        },
        style: {
          color: theme.vars ? theme.vars.palette.Alert[`${color2}Color`] : getColor(theme.palette[color2].light, 0.6),
          border: `1px solid ${(theme.vars || theme).palette[color2].light}`,
          [`& .${alertClasses_default.icon}`]: theme.vars ? {
            color: theme.vars.palette.Alert[`${color2}IconColor`]
          } : {
            color: theme.palette[color2].main
          }
        }
      })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color2]) => ({
        props: {
          colorSeverity: color2,
          variant: "filled"
        },
        style: {
          fontWeight: theme.typography.fontWeightMedium,
          ...theme.vars ? {
            color: theme.vars.palette.Alert[`${color2}FilledColor`],
            backgroundColor: theme.vars.palette.Alert[`${color2}FilledBg`]
          } : {
            backgroundColor: theme.palette.mode === "dark" ? theme.palette[color2].dark : theme.palette[color2].main,
            color: theme.palette.getContrastText(theme.palette[color2].main)
          }
        }
      }))]
    };
  }));
  var AlertIcon = styled_default2("div", {
    name: "MuiAlert",
    slot: "Icon"
  })({
    marginRight: 12,
    padding: "7px 0",
    display: "flex",
    fontSize: 22,
    opacity: 0.9
  });
  var AlertMessage = styled_default2("div", {
    name: "MuiAlert",
    slot: "Message"
  })({
    padding: "8px 0",
    minWidth: 0,
    overflow: "auto"
  });
  var AlertAction = styled_default2("div", {
    name: "MuiAlert",
    slot: "Action"
  })({
    display: "flex",
    alignItems: "flex-start",
    padding: "4px 0 0 16px",
    marginLeft: "auto",
    marginRight: -8
  });
  var defaultIconMapping = {
    success: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(SuccessOutlined_default, {
      fontSize: "inherit"
    }),
    warning: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(ReportProblemOutlined_default, {
      fontSize: "inherit"
    }),
    error: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(ErrorOutline_default, {
      fontSize: "inherit"
    }),
    info: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(InfoOutlined_default, {
      fontSize: "inherit"
    })
  };
  var Alert = /* @__PURE__ */ React44.forwardRef(function Alert2(inProps, ref) {
    const props = useDefaultProps2({
      props: inProps,
      name: "MuiAlert"
    });
    const {
      action,
      children,
      className,
      closeText = "Close",
      color: color2,
      components = {},
      componentsProps = {},
      icon,
      iconMapping = defaultIconMapping,
      onClose,
      role = "alert",
      severity = "success",
      slotProps = {},
      slots = {},
      variant = "standard",
      ...other
    } = props;
    const ownerState = {
      ...props,
      color: color2,
      severity,
      variant,
      colorSeverity: color2 || severity
    };
    const classes = useUtilityClasses6(ownerState);
    const externalForwardedProps = {
      slots: {
        closeButton: components.CloseButton,
        closeIcon: components.CloseIcon,
        ...slots
      },
      slotProps: {
        ...componentsProps,
        ...slotProps
      }
    };
    const [RootSlot, rootSlotProps] = useSlot("root", {
      ref,
      shouldForwardComponentProp: true,
      className: clsx_default(classes.root, className),
      elementType: AlertRoot,
      externalForwardedProps: {
        ...externalForwardedProps,
        ...other
      },
      ownerState,
      additionalProps: {
        role,
        elevation: 0
      }
    });
    const [IconSlot, iconSlotProps] = useSlot("icon", {
      className: classes.icon,
      elementType: AlertIcon,
      externalForwardedProps,
      ownerState
    });
    const [MessageSlot, messageSlotProps] = useSlot("message", {
      className: classes.message,
      elementType: AlertMessage,
      externalForwardedProps,
      ownerState
    });
    const [ActionSlot, actionSlotProps] = useSlot("action", {
      className: classes.action,
      elementType: AlertAction,
      externalForwardedProps,
      ownerState
    });
    const [CloseButtonSlot, closeButtonProps] = useSlot("closeButton", {
      elementType: IconButton_default,
      externalForwardedProps,
      ownerState
    });
    const [CloseIconSlot, closeIconProps] = useSlot("closeIcon", {
      elementType: Close_default,
      externalForwardedProps,
      ownerState
    });
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(RootSlot, {
      ...rootSlotProps,
      children: [icon !== false ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(IconSlot, {
        ...iconSlotProps,
        children: icon || iconMapping[severity] || defaultIconMapping[severity]
      }) : null, /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(MessageSlot, {
        ...messageSlotProps,
        children
      }), action != null ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(ActionSlot, {
        ...actionSlotProps,
        children: action
      }) : null, action == null && onClose ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(ActionSlot, {
        ...actionSlotProps,
        children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(CloseButtonSlot, {
          size: "small",
          "aria-label": closeText,
          title: closeText,
          color: "inherit",
          onClick: onClose,
          ...closeButtonProps,
          children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(CloseIconSlot, {
            fontSize: "small",
            ...closeIconProps
          })
        })
      }) : null]
    });
  });
  false ? Alert.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
     * The action to display. It renders after the message, at the end of the alert.
     */
    action: import_prop_types.default.node,
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
     * Override the default label for the *close popup* icon button.
     *
     * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
     * @default 'Close'
     */
    closeText: import_prop_types.default.string,
    /**
     * The color of the component. Unless provided, the value is taken from the `severity` prop.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
     */
    color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["error", "info", "success", "warning"]), import_prop_types.default.string]),
    /**
     * The components used for each slot inside.
     *
     * @deprecated use the `slots` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
     *
     * @default {}
     */
    components: import_prop_types.default.shape({
      CloseButton: import_prop_types.default.elementType,
      CloseIcon: import_prop_types.default.elementType
    }),
    /**
     * The extra props for the slot components.
     * You can override the existing props or add new ones.
     *
     * @deprecated use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
     *
     * @default {}
     */
    componentsProps: import_prop_types.default.shape({
      closeButton: import_prop_types.default.object,
      closeIcon: import_prop_types.default.object
    }),
    /**
     * Override the icon displayed before the children.
     * Unless provided, the icon is mapped to the value of the `severity` prop.
     * Set to `false` to remove the `icon`.
     */
    icon: import_prop_types.default.node,
    /**
     * The component maps the `severity` prop to a range of different icons,
     * for instance success to `<SuccessOutlined>`.
     * If you wish to change this mapping, you can provide your own.
     * Alternatively, you can use the `icon` prop to override the icon displayed.
     */
    iconMapping: import_prop_types.default.shape({
      error: import_prop_types.default.node,
      info: import_prop_types.default.node,
      success: import_prop_types.default.node,
      warning: import_prop_types.default.node
    }),
    /**
     * Callback fired when the component requests to be closed.
     * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
     * @param {React.SyntheticEvent} event The event source of the callback.
     */
    onClose: import_prop_types.default.func,
    /**
     * The ARIA role attribute of the element.
     * @default 'alert'
     */
    role: import_prop_types.default.string,
    /**
     * The severity of the alert. This defines the color and icon used.
     * @default 'success'
     */
    severity: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["error", "info", "success", "warning"]), import_prop_types.default.string]),
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps: import_prop_types.default.shape({
      action: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
      closeButton: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
      closeIcon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
      icon: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
      message: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
      root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
    }),
    /**
     * The components used for each slot inside.
     * @default {}
     */
    slots: import_prop_types.default.shape({
      action: import_prop_types.default.elementType,
      closeButton: import_prop_types.default.elementType,
      closeIcon: import_prop_types.default.elementType,
      icon: import_prop_types.default.elementType,
      message: import_prop_types.default.elementType,
      root: import_prop_types.default.elementType
    }),
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
    /**
     * The variant to use.
     * @default 'standard'
     */
    variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["filled", "outlined", "standard"]), import_prop_types.default.string])
  } : void 0;
  var Alert_default = Alert;

  var React45 = __toESM(require_react(), 1);
  var import_jsx_runtime24 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses7 = (ownerState) => {
  var Typography = /* @__PURE__ */ React45.forwardRef(function Typography2(inProps, ref) {
    const classes = useUtilityClasses7(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(TypographyRoot, {
  var React46 = __toESM(require_react(), 1);
  var import_jsx_runtime25 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses8 = (ownerState) => {
  var AppBar = /* @__PURE__ */ React46.forwardRef(function AppBar2(inProps, ref) {
    const classes = useUtilityClasses8(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(AppBarRoot, {
  var React61 = __toESM(require_react(), 1);
  var React48 = __toESM(require_react(), 1);
  var React47 = __toESM(require_react(), 1);
    const ref = React47.useRef({});
    React47.useEffect(() => {
    const ignoreFocus = React48.useRef(false);
    const firstFocus = React48.useRef(true);
    const inputRef = React48.useRef(null);
    const listboxRef = React48.useRef(null);
    const [anchorEl, setAnchorEl] = React48.useState(null);
    const [focusedItem, setFocusedItem] = React48.useState(-1);
    const highlightedIndexRef = React48.useRef(defaultHighlighted);
    const initialInputValue = React48.useRef(getInputValue(defaultValue ?? valueProp, multiple, getOptionLabel)).current;
    const [focused, setFocused] = React48.useState(false);
    const resetInputValue = React48.useCallback((event, newValue, reason) => {
    const [inputPristine, setInputPristine] = React48.useState(true);
    React48.useEffect(() => {
    React48.useEffect(() => {
    const syncHighlightedIndex = React48.useCallback(() => {
      React48.useEffect(() => {
    React48.useEffect(() => {
    const isTouch = React48.useRef(false);
  var React52 = __toESM(require_react(), 1);
  var React51 = __toESM(require_react(), 1);
  var React50 = __toESM(require_react(), 1);
  var React49 = __toESM(require_react(), 1);
    if (parseInt(React49.version, 10) >= 19) {
  var Portal = /* @__PURE__ */ React50.forwardRef(function Portal2(props, forwardedRef) {
    const [mountNode, setMountNode] = React50.useState(null);
    const handleRef = useForkRef(/* @__PURE__ */ React50.isValidElement(children) ? getReactElementRef(children) : null, forwardedRef);
      if (/* @__PURE__ */ React50.isValidElement(children)) {
        return /* @__PURE__ */ React50.cloneElement(children, newProps);
  var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses9 = (ownerState) => {
  var PopperTooltip = /* @__PURE__ */ React51.forwardRef(function PopperTooltip2(props, forwardedRef) {
    const tooltipRef = React51.useRef(null);
    const popperRef = React51.useRef(null);
    const handlePopperRefRef = React51.useRef(handlePopperRef);
    React51.useImperativeHandle(popperRefProp, () => popperRef.current, []);
    const [placement, setPlacement] = React51.useState(rtlPlacement);
    const [resolvedAnchorElement, setResolvedAnchorElement] = React51.useState(resolveAnchorEl(anchorEl));
    React51.useEffect(() => {
    React51.useEffect(() => {
    const classes = useUtilityClasses9(props);
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Root, {
  var Popper = /* @__PURE__ */ React51.forwardRef(function Popper2(props, forwardedRef) {
    const [exited, setExited] = React51.useState(true);
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Portal_default, {
      children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(PopperTooltip, {
  var import_jsx_runtime27 = __toESM(require_jsx_runtime(), 1);
  var Popper3 = /* @__PURE__ */ React52.forwardRef(function Popper4(inProps, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(PopperRoot, {
  var React53 = __toESM(require_react(), 1);
  var import_jsx_runtime28 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses10 = (ownerState) => {
  var ListSubheader = /* @__PURE__ */ React53.forwardRef(function ListSubheader2(inProps, ref) {
    const classes = useUtilityClasses10(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ListSubheaderRoot, {
  var React55 = __toESM(require_react(), 1);
  var React54 = __toESM(require_react(), 1);
  var import_jsx_runtime29 = __toESM(require_jsx_runtime(), 1);
  var Cancel_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime29.jsx)("path", {
  var import_jsx_runtime30 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses11 = (ownerState) => {
  var Chip = /* @__PURE__ */ React55.forwardRef(function Chip2(inProps, ref) {
    const chipRef = React55.useRef(null);
      iconColor: /* @__PURE__ */ React55.isValidElement(iconProp) ? iconProp.props.color || color2 : color2,
    const classes = useUtilityClasses11(ownerState);
      deleteIcon = deleteIconProp && /* @__PURE__ */ React55.isValidElement(deleteIconProp) ? /* @__PURE__ */ React55.cloneElement(deleteIconProp, {
      }) : /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Cancel_default, {
    if (avatarProp && /* @__PURE__ */ React55.isValidElement(avatarProp)) {
      avatar = /* @__PURE__ */ React55.cloneElement(avatarProp, {
    if (iconProp && /* @__PURE__ */ React55.isValidElement(iconProp)) {
      icon = /* @__PURE__ */ React55.cloneElement(iconProp, {
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(RootSlot, {
      children: [avatar || icon, /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(LabelSlot, {
  var React59 = __toESM(require_react(), 1);
  var React56 = __toESM(require_react(), 1);
  var import_jsx_runtime31 = __toESM(require_jsx_runtime(), 1);
  var TextareaAutosize = /* @__PURE__ */ React56.forwardRef(function TextareaAutosize2(props, forwardedRef) {
    } = React56.useRef(value != null);
    const textareaRef = React56.useRef(null);
    const heightRef = React56.useRef(null);
    const hiddenTextareaRef = React56.useRef(null);
    const calculateTextareaStyles = React56.useCallback(() => {
    const syncHeight = React56.useCallback(() => {
    const frameRef = React56.useRef(-1);
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(React56.Fragment, {
      children: [/* @__PURE__ */ (0, import_jsx_runtime31.jsx)("textarea", {
      }), /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("textarea", {
  var React57 = __toESM(require_react(), 1);
  var FormControlContext = /* @__PURE__ */ React57.createContext(void 0);
  var React58 = __toESM(require_react(), 1);
    return React58.useContext(FormControlContext_default);
  var import_jsx_runtime32 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses12 = (ownerState) => {
  var InputBase = /* @__PURE__ */ React59.forwardRef(function InputBase2(inProps, ref) {
    } = React59.useRef(value != null);
    const inputRef = React59.useRef();
    const handleInputRefWarning = React59.useCallback((instance) => {
    const [focused, setFocused] = React59.useState(false);
      React59.useEffect(() => {
    React59.useEffect(() => {
    const checkDirty = React59.useCallback((obj) => {
    React59.useEffect(() => {
    React59.useEffect(() => {
    const classes = useUtilityClasses12(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(React59.Fragment, {
      (_InputGlobalStyles || (_InputGlobalStyles = /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(InputGlobalStyles, {}))), /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(Root, {
        children: [startAdornment, /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(FormControlContext_default.Provider, {
          children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Input3, {
  var React60 = __toESM(require_react(), 1);
  var import_jsx_runtime33 = __toESM(require_jsx_runtime(), 1);
  var ArrowDropDown_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime33.jsx)("path", {
  var import_jsx_runtime34 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses13 = (ownerState) => {
  var Autocomplete = /* @__PURE__ */ React61.forwardRef(function Autocomplete2(inProps, ref) {
      clearIcon = _ClearIcon || (_ClearIcon = /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Close_default, {
      popupIcon = _ArrowDropDownIcon || (_ArrowDropDownIcon = /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(ArrowDropDown_default, {})),
    const classes = useUtilityClasses13(ownerState);
            return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Chip_default, {
        startAdornment.push(/* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", {
    const defaultRenderGroup = (params) => /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("li", {
      children: [/* @__PURE__ */ (0, import_jsx_runtime34.jsx)(AutocompleteGroupLabel, {
      }), /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(AutocompleteGroupUl, {
      return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("li", {
    return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(React61.Fragment, {
      children: [/* @__PURE__ */ (0, import_jsx_runtime34.jsx)(AutocompleteRoot, {
              endAdornment: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(AutocompleteEndAdornment, {
                children: [hasClearIcon ? /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(AutocompleteClearIndicator, {
                }) : null, hasPopupIcon ? /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(AutocompletePopupIndicator, {
      }), anchorEl ? /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(AutocompletePopper, {
        children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(AutocompletePaper, {
          children: [loading && groupedOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(AutocompleteLoading, {
          }) : null, groupedOptions.length === 0 && !freeSolo && !loading ? /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(AutocompleteNoOptions, {
          }) : null, groupedOptions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(ListboxSlot, {
  var React63 = __toESM(require_react(), 1);
  var React62 = __toESM(require_react(), 1);
  var import_jsx_runtime35 = __toESM(require_jsx_runtime(), 1);
  var Person_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime35.jsx)("path", {
  var import_jsx_runtime36 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses14 = (ownerState) => {
    const [loaded, setLoaded] = React63.useState(false);
    React63.useEffect(() => {
  var Avatar = /* @__PURE__ */ React63.forwardRef(function Avatar2(inProps, ref) {
    const classes = useUtilityClasses14(ownerState);
      children = /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(ImgSlot, {
      children = /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(FallbackSlot, {
    return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(RootSlot, {
  var React65 = __toESM(require_react(), 1);
  var React64 = __toESM(require_react(), 1);
  var import_jsx_runtime37 = __toESM(require_jsx_runtime(), 1);
  var Fade = /* @__PURE__ */ React64.forwardRef(function Fade2(props, ref) {
    const nodeRef = React64.useRef(null);
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(TransitionComponent, {
        return /* @__PURE__ */ React64.cloneElement(children, {
  var import_jsx_runtime38 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses15 = (ownerState) => {
  var Backdrop = /* @__PURE__ */ React65.forwardRef(function Backdrop2(inProps, ref) {
    const classes = useUtilityClasses15(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(TransitionSlot, {
      children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(RootSlot, {
  var React68 = __toESM(require_react(), 1);
  var React66 = __toESM(require_react(), 1);
  var ButtonGroupContext = /* @__PURE__ */ React66.createContext({});
  var React67 = __toESM(require_react(), 1);
  var ButtonGroupButtonContext = /* @__PURE__ */ React67.createContext(void 0);
  var import_jsx_runtime39 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses16 = (ownerState) => {
  var Button = /* @__PURE__ */ React68.forwardRef(function Button2(inProps, ref) {
    const contextProps = React68.useContext(ButtonGroupContext_default);
    const buttonGroupButtonContextPositionClassName = React68.useContext(ButtonGroupButtonContext_default);
    const loadingIndicator = loadingIndicatorProp ?? /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(CircularProgress_default, {
    const classes = useUtilityClasses16(ownerState);
    const startIcon = (startIconProp || loading && loadingPosition === "start") && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(ButtonStartIcon, {
      children: startIconProp || /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(ButtonLoadingIconPlaceholder, {
    const endIcon = (endIconProp || loading && loadingPosition === "end") && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(ButtonEndIcon, {
      children: endIconProp || /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(ButtonLoadingIconPlaceholder, {
      /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", {
        children: loading && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(ButtonLoadingIndicator, {
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(ButtonRoot, {
  // node_modules/@mui/material/esm/ClickAwayListener/ClickAwayListener.js
  var React69 = __toESM(require_react(), 1);
  function mapEventPropToEvent(eventProp) {
    return eventProp.substring(2).toLowerCase();
  }
  function clickedRootScrollbar(event, doc) {
    return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
  }
  function ClickAwayListener(props) {
    const {
      children,
      disableReactTree = false,
      mouseEvent = "onClick",
      onClickAway,
      touchEvent = "onTouchEnd"
    } = props;
    const movedRef = React69.useRef(false);
    const nodeRef = React69.useRef(null);
    const activatedRef = React69.useRef(false);
    const syntheticEventRef = React69.useRef(false);
    React69.useEffect(() => {
      setTimeout(() => {
        activatedRef.current = true;
      }, 0);
      return () => {
        activatedRef.current = false;
      };
    }, []);
    const handleRef = useForkRef(getReactElementRef(children), nodeRef);
    const handleClickAway = useEventCallback_default((event) => {
      const insideReactTree = syntheticEventRef.current;
      syntheticEventRef.current = false;
      const doc = ownerDocument(nodeRef.current);
      if (!activatedRef.current || !nodeRef.current || "clientX" in event && clickedRootScrollbar(event, doc)) {
        return;
      }
      if (movedRef.current) {
        movedRef.current = false;
        return;
      }
      let insideDOM;
      if (event.composedPath) {
        insideDOM = event.composedPath().includes(nodeRef.current);
      } else {
        insideDOM = !doc.documentElement.contains(
          // @ts-expect-error returns `false` as intended when not dispatched from a Node
          event.target
        ) || nodeRef.current.contains(
          // @ts-expect-error returns `false` as intended when not dispatched from a Node
          event.target
        );
      }
      if (!insideDOM && (disableReactTree || !insideReactTree)) {
        onClickAway(event);
      }
    });
    const createHandleSynthetic = (handlerName) => (event) => {
      syntheticEventRef.current = true;
      const childrenPropsHandler = children.props[handlerName];
      if (childrenPropsHandler) {
        childrenPropsHandler(event);
      }
    };
    const childrenProps = {
      ref: handleRef
    };
    if (touchEvent !== false) {
      childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
    }
    React69.useEffect(() => {
      if (touchEvent !== false) {
        const mappedTouchEvent = mapEventPropToEvent(touchEvent);
        const doc = ownerDocument(nodeRef.current);
        const handleTouchMove = () => {
          movedRef.current = true;
        };
        doc.addEventListener(mappedTouchEvent, handleClickAway);
        doc.addEventListener("touchmove", handleTouchMove);
        return () => {
          doc.removeEventListener(mappedTouchEvent, handleClickAway);
          doc.removeEventListener("touchmove", handleTouchMove);
        };
      }
      return void 0;
    }, [handleClickAway, touchEvent]);
    if (mouseEvent !== false) {
      childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
    }
    React69.useEffect(() => {
      if (mouseEvent !== false) {
        const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
        const doc = ownerDocument(nodeRef.current);
        doc.addEventListener(mappedMouseEvent, handleClickAway);
        return () => {
          doc.removeEventListener(mappedMouseEvent, handleClickAway);
        };
      }
      return void 0;
    }, [handleClickAway, mouseEvent]);
    return /* @__PURE__ */ React69.cloneElement(children, childrenProps);
  }
  false ? ClickAwayListener.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
     * The wrapped element.
     */
    children: elementAcceptingRef_default.isRequired,
    /**
     * If `true`, the React tree is ignored and only the DOM tree is considered.
     * This prop changes how portaled elements are handled.
     * @default false
     */
    disableReactTree: import_prop_types.default.bool,
    /**
     * The mouse event to listen to. You can disable the listener by providing `false`.
     * @default 'onClick'
     */
    mouseEvent: import_prop_types.default.oneOf(["onClick", "onMouseDown", "onMouseUp", "onPointerDown", "onPointerUp", false]),
    /**
     * Callback fired when a "click away" event is detected.
     */
    onClickAway: import_prop_types.default.func.isRequired,
    /**
     * The touch event to listen to. You can disable the listener by providing `false`.
     * @default 'onTouchEnd'
     */
    touchEvent: import_prop_types.default.oneOf(["onTouchEnd", "onTouchStart", false])
  } : void 0;
  if (false) {
    ClickAwayListener["propTypes"] = exactProp(ClickAwayListener.propTypes);
  }

  var React70 = __toESM(require_react(), 1);
  var import_jsx_runtime40 = __toESM(require_jsx_runtime(), 1);
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(React70.Fragment, {
      children: [isDynamicSupport && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(GlobalStyles4, {
      }), !isDynamicSupport && !enableColorScheme && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", {
  var React73 = __toESM(require_react(), 1);
  var React71 = __toESM(require_react(), 1);
  var import_jsx_runtime41 = __toESM(require_jsx_runtime(), 1);
    const ignoreNextEnforceFocus = React71.useRef(false);
    const sentinelStart = React71.useRef(null);
    const sentinelEnd = React71.useRef(null);
    const nodeToRestore = React71.useRef(null);
    const reactFocusEventTarget = React71.useRef(null);
    const activated = React71.useRef(false);
    const rootRef = React71.useRef(null);
    const lastKeydown = React71.useRef(null);
    React71.useEffect(() => {
    React71.useEffect(() => {
    React71.useEffect(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(React71.Fragment, {
      children: [/* @__PURE__ */ (0, import_jsx_runtime41.jsx)("div", {
      }), /* @__PURE__ */ React71.cloneElement(children, {
      }), /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("div", {
  var React72 = __toESM(require_react(), 1);
    const modal = React72.useRef({});
    const mountNodeRef = React72.useRef(null);
    const modalRef = React72.useRef(null);
    const [exited, setExited] = React72.useState(!open);
    const handleClose = React72.useCallback(() => {
    React72.useEffect(() => {
    React72.useEffect(() => {
  var import_jsx_runtime42 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses17 = (ownerState) => {
  var Modal = /* @__PURE__ */ React73.forwardRef(function Modal2(inProps, ref) {
    const classes = useUtilityClasses17(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(Portal_default, {
      children: /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(RootSlot, {
        children: [!hideBackdrop && BackdropComponent ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(BackdropSlot, {
        }) : null, /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(FocusTrap_default, {
          children: /* @__PURE__ */ React73.cloneElement(children, childProps)
  var React75 = __toESM(require_react(), 1);
  var React74 = __toESM(require_react(), 1);
  var import_jsx_runtime43 = __toESM(require_jsx_runtime(), 1);
  var Slide = /* @__PURE__ */ React74.forwardRef(function Slide2(props, ref) {
    const childrenRef = React74.useRef(null);
    const updatePosition = React74.useCallback(() => {
    React74.useEffect(() => {
    React74.useEffect(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(TransitionComponent, {
        return /* @__PURE__ */ React74.cloneElement(children, {
  var import_jsx_runtime44 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses18 = (ownerState) => {
  var Drawer = /* @__PURE__ */ React75.forwardRef(function Drawer2(inProps, ref) {
    const mounted = React75.useRef(false);
    React75.useEffect(() => {
    const classes = useUtilityClasses18(ownerState);
    const drawer = /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(PaperSlot, {
      return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(DockedSlot, {
    const slidingDrawer = /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(TransitionSlot, {
      return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(DockedSlot, {
    return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(RootSlot, {
  var React76 = __toESM(require_react(), 1);
  var import_jsx_runtime45 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses19 = (ownerState) => {
  var FilledInput = /* @__PURE__ */ React76.forwardRef(function FilledInput2(inProps, ref) {
    const classes = useUtilityClasses19(props);
    return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(InputBase_default, {
  var React77 = __toESM(require_react(), 1);
  var import_jsx_runtime46 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses20 = (ownerState) => {
  var FormControl = /* @__PURE__ */ React77.forwardRef(function FormControl2(inProps, ref) {
    const classes = useUtilityClasses20(ownerState);
    const [adornedStart, setAdornedStart] = React77.useState(() => {
        React77.Children.forEach(children, (child) => {
    const [filled, setFilled] = React77.useState(() => {
        React77.Children.forEach(children, (child) => {
    const [focusedState, setFocused] = React77.useState(false);
    const registeredInput = React77.useRef(false);
    const onFilled = React77.useCallback(() => {
    const onEmpty = React77.useCallback(() => {
    const childContext = React77.useMemo(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(FormControlContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(FormControlRoot, {
  var React78 = __toESM(require_react(), 1);
  var import_jsx_runtime47 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses21 = (ownerState) => {
  var FormHelperText = /* @__PURE__ */ React78.forwardRef(function FormHelperText2(inProps, ref) {
    const classes = useUtilityClasses21(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(FormHelperTextRoot, {
        _span || (_span = /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("span", {
  var React79 = __toESM(require_react(), 1);
  var import_jsx_runtime48 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses22 = (ownerState) => {
  var FormLabel = /* @__PURE__ */ React79.forwardRef(function FormLabel2(inProps, ref) {
    const classes = useUtilityClasses22(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(FormLabelRoot, {
      children: [children, fcs.required && /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(AsteriskComponent, {
  var React80 = __toESM(require_react(), 1);
  var import_jsx_runtime49 = __toESM(require_jsx_runtime(), 1);
  var Grow = /* @__PURE__ */ React80.forwardRef(function Grow2(props, ref) {
    const autoTimeout = React80.useRef();
    const nodeRef = React80.useRef(null);
    return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(TransitionComponent, {
        return /* @__PURE__ */ React80.cloneElement(children, {
  var React81 = __toESM(require_react(), 1);
  var import_jsx_runtime50 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses23 = (ownerState) => {
  var Input = /* @__PURE__ */ React81.forwardRef(function Input2(inProps, ref) {
    const classes = useUtilityClasses23(props);
    return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(InputBase_default, {
  var React82 = __toESM(require_react(), 1);
  var import_jsx_runtime51 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses24 = (ownerState) => {
  var InputLabel = /* @__PURE__ */ React82.forwardRef(function InputLabel2(inProps, ref) {
    const classes = useUtilityClasses24(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(InputLabelRoot, {
  var React83 = __toESM(require_react(), 1);
  var import_jsx_runtime52 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses25 = (ownerState) => {
  var Link2 = /* @__PURE__ */ React83.forwardRef(function Link3(inProps, ref) {
    const [focusVisible, setFocusVisible] = React83.useState(false);
    const classes = useUtilityClasses25(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(LinkRoot, {
  var React85 = __toESM(require_react(), 1);
  var React84 = __toESM(require_react(), 1);
  var ListContext = /* @__PURE__ */ React84.createContext({});
  var import_jsx_runtime53 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses26 = (ownerState) => {
  var List = /* @__PURE__ */ React85.forwardRef(function List2(inProps, ref) {
    const context = React85.useMemo(() => ({
    const classes = useUtilityClasses26(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(ListContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(ListRoot, {
  var React88 = __toESM(require_react(), 1);
  var React86 = __toESM(require_react(), 1);
  var import_jsx_runtime54 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses27 = (ownerState) => {
  var ListItemButton = /* @__PURE__ */ React86.forwardRef(function ListItemButton2(inProps, ref) {
    const context = React86.useContext(ListContext_default);
    const childContext = React86.useMemo(() => ({
    const listItemRef = React86.useRef(null);
    const classes = useUtilityClasses27(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(ListContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(ListItemButtonRoot, {
  var React87 = __toESM(require_react(), 1);
  var import_jsx_runtime55 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses28 = (ownerState) => {
  var ListItemSecondaryAction = /* @__PURE__ */ React87.forwardRef(function ListItemSecondaryAction2(inProps, ref) {
    const context = React87.useContext(ListContext_default);
    const classes = useUtilityClasses28(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(ListItemSecondaryActionRoot, {
  var import_jsx_runtime56 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses29 = (ownerState) => {
  var ListItem = /* @__PURE__ */ React88.forwardRef(function ListItem2(inProps, ref) {
    const context = React88.useContext(ListContext_default);
    const childContext = React88.useMemo(() => ({
    const listItemRef = React88.useRef(null);
    const children = React88.Children.toArray(childrenProp);
    const classes = useUtilityClasses29(ownerState);
      return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(ListContext_default.Provider, {
        children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(ListItemContainer, {
          children: [/* @__PURE__ */ (0, import_jsx_runtime56.jsx)(Root, {
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(ListContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(Root, {
        children: [children, secondaryAction && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(ListItemSecondaryAction_default, {
      const children = React88.Children.toArray(props.children);
  var React89 = __toESM(require_react(), 1);
  var import_jsx_runtime57 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses30 = (ownerState) => {
  var ListItemIcon = /* @__PURE__ */ React89.forwardRef(function ListItemIcon2(inProps, ref) {
    const context = React89.useContext(ListContext_default);
    const classes = useUtilityClasses30(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(ListItemIconRoot, {
  var React90 = __toESM(require_react(), 1);
  var import_jsx_runtime58 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses31 = (ownerState) => {
  var ListItemText = /* @__PURE__ */ React90.forwardRef(function ListItemText2(inProps, ref) {
    } = React90.useContext(ListContext_default);
    const classes = useUtilityClasses31(ownerState);
      primary = /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(PrimarySlot, {
      secondary = /* @__PURE__ */ (0, import_jsx_runtime58.jsx)(SecondarySlot, {
    return /* @__PURE__ */ (0, import_jsx_runtime58.jsxs)(RootSlot, {
  var React93 = __toESM(require_react(), 1);
  var React91 = __toESM(require_react(), 1);
  var import_jsx_runtime59 = __toESM(require_jsx_runtime(), 1);
  var MenuList = /* @__PURE__ */ React91.forwardRef(function MenuList2(props, ref) {
    const listRef = React91.useRef(null);
    const textCriteriaRef = React91.useRef({
    React91.useImperativeHandle(actions, () => ({
    React91.Children.forEach(children, (child, index) => {
      if (!/* @__PURE__ */ React91.isValidElement(child)) {
    const items = React91.Children.map(children, (child, index) => {
        return /* @__PURE__ */ React91.cloneElement(child, newChildProps);
    return /* @__PURE__ */ (0, import_jsx_runtime59.jsx)(List_default, {
  var React92 = __toESM(require_react(), 1);
  var import_jsx_runtime60 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses32 = (ownerState) => {
  var Popover = /* @__PURE__ */ React92.forwardRef(function Popover2(inProps, ref) {
    const paperRef = React92.useRef();
    const classes = useUtilityClasses32(ownerState);
    const getAnchorOffset = React92.useCallback(() => {
    const getTransformOrigin = React92.useCallback((elemRect) => {
    const getPositioningStyle = React92.useCallback((element) => {
    const [isPositioned, setIsPositioned] = React92.useState(open);
    const setPositioningStyles = React92.useCallback(() => {
    React92.useEffect(() => {
    React92.useEffect(() => {
    React92.useImperativeHandle(action, () => open ? {
    React92.useEffect(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(RootSlot, {
      children: /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(TransitionSlot, {
        children: /* @__PURE__ */ (0, import_jsx_runtime60.jsx)(PaperSlot, {
  var import_jsx_runtime61 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses33 = (ownerState) => {
  var Menu = /* @__PURE__ */ React93.forwardRef(function Menu2(inProps, ref) {
    const classes = useUtilityClasses33(ownerState);
    const menuListActionsRef = React93.useRef(null);
    React93.Children.map(children, (child, index) => {
      if (!/* @__PURE__ */ React93.isValidElement(child)) {
    return /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(MenuRoot, {
      children: /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(ListSlot, {
  var React94 = __toESM(require_react(), 1);
  var import_jsx_runtime62 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses34 = (ownerState) => {
  var MenuItem = /* @__PURE__ */ React94.forwardRef(function MenuItem2(inProps, ref) {
    const context = React94.useContext(ListContext_default);
    const childContext = React94.useMemo(() => ({
    const menuItemRef = React94.useRef(null);
    const classes = useUtilityClasses34(props);
    return /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ListContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(MenuItemRoot, {
  var React95 = __toESM(require_react(), 1);
  var import_jsx_runtime63 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses35 = (ownerState) => {
  var NativeSelectInput = /* @__PURE__ */ React95.forwardRef(function NativeSelectInput2(props, ref) {
    const classes = useUtilityClasses35(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime63.jsxs)(React95.Fragment, {
      children: [/* @__PURE__ */ (0, import_jsx_runtime63.jsx)(NativeSelectSelect, {
      }), props.multiple ? null : /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(NativeSelectIcon, {
  var React97 = __toESM(require_react(), 1);
  var React96 = __toESM(require_react(), 1);
  var import_jsx_runtime64 = __toESM(require_jsx_runtime(), 1);
    return /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(NotchedOutlineRoot, {
      children: /* @__PURE__ */ (0, import_jsx_runtime64.jsx)(NotchedOutlineLegend, {
        children: withLabel ? /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("span", {
          _span2 || (_span2 = /* @__PURE__ */ (0, import_jsx_runtime64.jsx)("span", {
  var import_jsx_runtime65 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses36 = (ownerState) => {
  var OutlinedInput = /* @__PURE__ */ React97.forwardRef(function OutlinedInput2(inProps, ref) {
    const classes = useUtilityClasses36(props);
        label: label != null && label !== "" && fcs.required ? /* @__PURE__ */ (0, import_jsx_runtime65.jsxs)(React97.Fragment, {
    return /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(InputBase_default, {
      renderSuffix: (state) => /* @__PURE__ */ (0, import_jsx_runtime65.jsx)(NotchedSlot, {
  var React99 = __toESM(require_react(), 1);
  var React98 = __toESM(require_react(), 1);
  var import_jsx_runtime66 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses37 = (ownerState) => {
  var SelectInput = /* @__PURE__ */ React98.forwardRef(function SelectInput2(props, ref) {
    const inputRef = React98.useRef(null);
    const displayRef = React98.useRef(null);
    const [displayNode, setDisplayNode] = React98.useState(null);
    } = React98.useRef(openProp != null);
    const [menuMinWidthState, setMenuMinWidthState] = React98.useState();
    const handleDisplayRef = React98.useCallback((node2) => {
    React98.useImperativeHandle(handleRef, () => ({
    React98.useEffect(() => {
    React98.useEffect(() => {
    React98.useEffect(() => {
    const childrenArray = React98.Children.toArray(children);
      if (!/* @__PURE__ */ React98.isValidElement(child)) {
      return /* @__PURE__ */ React98.cloneElement(child, {
      React98.useEffect(() => {
    const classes = useUtilityClasses37(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime66.jsxs)(React98.Fragment, {
      children: [/* @__PURE__ */ (0, import_jsx_runtime66.jsx)(SelectSelect, {
          _span3 || (_span3 = /* @__PURE__ */ (0, import_jsx_runtime66.jsx)("span", {
      }), /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(SelectNativeInput, {
      }), /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(SelectIcon, {
      }), /* @__PURE__ */ (0, import_jsx_runtime66.jsx)(Menu_default, {
  var import_jsx_runtime67 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses38 = (ownerState) => {
  var Select = /* @__PURE__ */ React99.forwardRef(function Select2(inProps, ref) {
    const classes = useUtilityClasses38(ownerState);
      standard: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(StyledInput, {
      outlined: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(StyledOutlinedInput, {
      filled: /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(StyledFilledInput, {
    return /* @__PURE__ */ (0, import_jsx_runtime67.jsx)(React99.Fragment, {
      children: /* @__PURE__ */ React99.cloneElement(InputComponent, {
    inputProps: import_prop_types.default.object,
    /**
     * See [OutlinedInput#label](https://mui.com/material-ui/api/outlined-input/#props)
     */
    label: import_prop_types.default.node,
    /**
     * The ID of an element that acts as an additional label. The Select will
     * be labelled by the additional label and the selected value.
     */
    labelId: import_prop_types.default.string,
    /**
     * Props applied to the [`Menu`](https://mui.com/material-ui/api/menu/) element.
     */
    MenuProps: import_prop_types.default.object,
    /**
     * If `true`, `value` must be an array and the menu will support multiple selections.
     * @default false
     */
    multiple: import_prop_types.default.bool,
    /**
     * If `true`, the component uses a native `select` element.
     * @default false
     */
    native: import_prop_types.default.bool,
    /**
     * Callback fired when a menu item is selected.
     *
     * @param {SelectChangeEvent<Value>} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (any).
     * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
     * @param {object} [child] The react element that was selected when `native` is `false` (default).
     */
    onChange: import_prop_types.default.func,
    /**
     * Callback fired when the component requests to be closed.
     * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select collapses).
     *
     * @param {object} event The event source of the callback.
     */
    onClose: import_prop_types.default.func,
    /**
     * Callback fired when the component requests to be opened.
     * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select expands).
     *
     * @param {object} event The event source of the callback.
     */
    onOpen: import_prop_types.default.func,
    /**
     * If `true`, the component is shown.
     * You can only use it when the `native` prop is `false` (default).
     */
    open: import_prop_types.default.bool,
    /**
     * Render the selected value.
     * You can only use it when the `native` prop is `false` (default).
     *
     * @param {any} value The `value` provided to the component.
     * @returns {ReactNode}
     */
    renderValue: import_prop_types.default.func,
    /**
     * Props applied to the clickable div element.
     */
    SelectDisplayProps: import_prop_types.default.object,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
    /**
     * The `input` value. Providing an empty string will select no options.
     * Set to an empty string `''` if you don't want any of the available options to be selected.
     *
     * If the value is an object it must have reference equality with the option in order to be selected.
     * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
     */
    value: import_prop_types.default.oneOfType([import_prop_types.default.oneOf([""]), import_prop_types.default.any]),
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant: import_prop_types.default.oneOf(["filled", "outlined", "standard"])
  } : void 0;
  Select.muiName = "Select";
  var Select_default = Select;

  // node_modules/@mui/material/esm/Snackbar/Snackbar.js
  var React102 = __toESM(require_react(), 1);

  // node_modules/@mui/material/esm/Snackbar/useSnackbar.js
  var React100 = __toESM(require_react(), 1);
  function useSnackbar(parameters = {}) {
    const {
      autoHideDuration = null,
      disableWindowBlurListener = false,
      onClose,
      open,
      resumeHideDuration
    } = parameters;
    const timerAutoHide = useTimeout();
    React100.useEffect(() => {
      if (!open) {
        return void 0;
      }
      function handleKeyDown(nativeEvent) {
        if (!nativeEvent.defaultPrevented) {
          if (nativeEvent.key === "Escape") {
            onClose?.(nativeEvent, "escapeKeyDown");
          }
        }
      }
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [open, onClose]);
    const handleClose = useEventCallback_default((event, reason) => {
      onClose?.(event, reason);
    });
    const setAutoHideTimer = useEventCallback_default((autoHideDurationParam) => {
      if (!onClose || autoHideDurationParam == null) {
        return;
      }
      timerAutoHide.start(autoHideDurationParam, () => {
        handleClose(null, "timeout");
      });
    });
    React100.useEffect(() => {
      if (open) {
        setAutoHideTimer(autoHideDuration);
      }
      return timerAutoHide.clear;
    }, [open, autoHideDuration, setAutoHideTimer, timerAutoHide]);
    const handleClickAway = (event) => {
      onClose?.(event, "clickaway");
    };
    const handlePause = timerAutoHide.clear;
    const handleResume = React100.useCallback(() => {
      if (autoHideDuration != null) {
        setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
      }
    }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);
    const createHandleBlur = (otherHandlers) => (event) => {
      const onBlurCallback = otherHandlers.onBlur;
      onBlurCallback?.(event);
      handleResume();
    };
    const createHandleFocus = (otherHandlers) => (event) => {
      const onFocusCallback = otherHandlers.onFocus;
      onFocusCallback?.(event);
      handlePause();
    };
    const createMouseEnter = (otherHandlers) => (event) => {
      const onMouseEnterCallback = otherHandlers.onMouseEnter;
      onMouseEnterCallback?.(event);
      handlePause();
    };
    const createMouseLeave = (otherHandlers) => (event) => {
      const onMouseLeaveCallback = otherHandlers.onMouseLeave;
      onMouseLeaveCallback?.(event);
      handleResume();
    };
    React100.useEffect(() => {
      if (!disableWindowBlurListener && open) {
        window.addEventListener("focus", handleResume);
        window.addEventListener("blur", handlePause);
        return () => {
          window.removeEventListener("focus", handleResume);
          window.removeEventListener("blur", handlePause);
        };
      }
      return void 0;
    }, [disableWindowBlurListener, open, handleResume, handlePause]);
    const getRootProps = (externalProps = {}) => {
      const externalEventHandlers = {
        ...extractEventHandlers_default(parameters),
        ...extractEventHandlers_default(externalProps)
      };
      return {
        // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
        // See https://github.com/mui/material-ui/issues/29080
        role: "presentation",
        ...externalProps,
        ...externalEventHandlers,
        onBlur: createHandleBlur(externalEventHandlers),
        onFocus: createHandleFocus(externalEventHandlers),
        onMouseEnter: createMouseEnter(externalEventHandlers),
        onMouseLeave: createMouseLeave(externalEventHandlers)
      };
    };
    return {
      getRootProps,
      onClickAway: handleClickAway
    };
  }
  var useSnackbar_default = useSnackbar;

  // node_modules/@mui/material/esm/SnackbarContent/SnackbarContent.js
  var React101 = __toESM(require_react(), 1);

  // node_modules/@mui/material/esm/SnackbarContent/snackbarContentClasses.js
  function getSnackbarContentUtilityClass(slot) {
    return generateUtilityClass("MuiSnackbarContent", slot);
  }
  var snackbarContentClasses = generateUtilityClasses("MuiSnackbarContent", ["root", "message", "action"]);

  // node_modules/@mui/material/esm/SnackbarContent/SnackbarContent.js
  var import_jsx_runtime68 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses39 = (ownerState) => {
    const {
      classes
    } = ownerState;
    const slots = {
      root: ["root"],
      action: ["action"],
      message: ["message"]
    };
    return composeClasses(slots, getSnackbarContentUtilityClass, classes);
  };
  var SnackbarContentRoot = styled_default2(Paper_default, {
    name: "MuiSnackbarContent",
    slot: "Root"
  })(memoTheme_default(({
    theme
  }) => {
    const emphasis = theme.palette.mode === "light" ? 0.8 : 0.98;
    return {
      ...theme.typography.body2,
      color: theme.vars ? theme.vars.palette.SnackbarContent.color : theme.palette.getContrastText(emphasize(theme.palette.background.default, emphasis)),
      backgroundColor: theme.vars ? theme.vars.palette.SnackbarContent.bg : emphasize(theme.palette.background.default, emphasis),
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      padding: "6px 16px",
      flexGrow: 1,
      [theme.breakpoints.up("sm")]: {
        flexGrow: "initial",
        minWidth: 288
      }
    };
  }));
  var SnackbarContentMessage = styled_default2("div", {
    name: "MuiSnackbarContent",
    slot: "Message"
  })({
    padding: "8px 0"
  });
  var SnackbarContentAction = styled_default2("div", {
    name: "MuiSnackbarContent",
    slot: "Action"
  })({
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    paddingLeft: 16,
    marginRight: -8
  });
  var SnackbarContent = /* @__PURE__ */ React101.forwardRef(function SnackbarContent2(inProps, ref) {
    const props = useDefaultProps2({
      props: inProps,
      name: "MuiSnackbarContent"
    });
    const {
      action,
      className,
      message,
      role = "alert",
      ...other
    } = props;
    const ownerState = props;
    const classes = useUtilityClasses39(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime68.jsxs)(SnackbarContentRoot, {
      role,
      elevation: 6,
      className: clsx_default(classes.root, className),
      ownerState,
      ref,
      ...other,
      children: [/* @__PURE__ */ (0, import_jsx_runtime68.jsx)(SnackbarContentMessage, {
        className: classes.message,
        ownerState,
        children: message
      }), action ? /* @__PURE__ */ (0, import_jsx_runtime68.jsx)(SnackbarContentAction, {
        className: classes.action,
        ownerState,
        children: action
      }) : null]
    });
  });
  false ? SnackbarContent.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
     * The action to display. It renders after the message, at the end of the snackbar.
     */
    action: import_prop_types.default.node,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: import_prop_types.default.object,
    /**
     * @ignore
     */
    className: import_prop_types.default.string,
    /**
     * The message to display.
     */
    message: import_prop_types.default.node,
    /**
     * The ARIA role attribute of the element.
     * @default 'alert'
     */
    role: import_prop_types.default.string,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
  } : void 0;
  var SnackbarContent_default = SnackbarContent;

  // node_modules/@mui/material/esm/Snackbar/snackbarClasses.js
  function getSnackbarUtilityClass(slot) {
    return generateUtilityClass("MuiSnackbar", slot);
  }
  var snackbarClasses = generateUtilityClasses("MuiSnackbar", ["root", "anchorOriginTopCenter", "anchorOriginBottomCenter", "anchorOriginTopRight", "anchorOriginBottomRight", "anchorOriginTopLeft", "anchorOriginBottomLeft"]);

  // node_modules/@mui/material/esm/Snackbar/Snackbar.js
  var import_jsx_runtime69 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses40 = (ownerState) => {
    const {
      classes,
      anchorOrigin
    } = ownerState;
    const slots = {
      root: ["root", `anchorOrigin${capitalize_default(anchorOrigin.vertical)}${capitalize_default(anchorOrigin.horizontal)}`]
    };
    return composeClasses(slots, getSnackbarUtilityClass, classes);
  };
  var SnackbarRoot = styled_default2("div", {
    name: "MuiSnackbar",
    slot: "Root",
    overridesResolver: (props, styles7) => {
      const {
        ownerState
      } = props;
      return [styles7.root, styles7[`anchorOrigin${capitalize_default(ownerState.anchorOrigin.vertical)}${capitalize_default(ownerState.anchorOrigin.horizontal)}`]];
    }
  })(memoTheme_default(({
    theme
  }) => ({
    zIndex: (theme.vars || theme).zIndex.snackbar,
    position: "fixed",
    display: "flex",
    left: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    variants: [{
      props: ({
        ownerState
      }) => ownerState.anchorOrigin.vertical === "top",
      style: {
        top: 8,
        [theme.breakpoints.up("sm")]: {
          top: 24
        }
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.anchorOrigin.vertical !== "top",
      style: {
        bottom: 8,
        [theme.breakpoints.up("sm")]: {
          bottom: 24
        }
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.anchorOrigin.horizontal === "left",
      style: {
        justifyContent: "flex-start",
        [theme.breakpoints.up("sm")]: {
          left: 24,
          right: "auto"
        }
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.anchorOrigin.horizontal === "right",
      style: {
        justifyContent: "flex-end",
        [theme.breakpoints.up("sm")]: {
          right: 24,
          left: "auto"
        }
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.anchorOrigin.horizontal === "center",
      style: {
        [theme.breakpoints.up("sm")]: {
          left: "50%",
          right: "auto",
          transform: "translateX(-50%)"
        }
      }
    }]
  })));
  var Snackbar = /* @__PURE__ */ React102.forwardRef(function Snackbar2(inProps, ref) {
    const props = useDefaultProps2({
      props: inProps,
      name: "MuiSnackbar"
    });
    const theme = useTheme4();
    const defaultTransitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen
    };
    const {
      action,
      anchorOrigin: {
        vertical,
        horizontal
      } = {
        vertical: "bottom",
        horizontal: "left"
      },
      autoHideDuration = null,
      children,
      className,
      ClickAwayListenerProps: ClickAwayListenerPropsProp,
      ContentProps: ContentPropsProp,
      disableWindowBlurListener = false,
      message,
      onBlur,
      onClose,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      open,
      resumeHideDuration,
      slots = {},
      slotProps = {},
      TransitionComponent: TransitionComponentProp,
      transitionDuration = defaultTransitionDuration,
      TransitionProps: {
        onEnter,
        onExited,
        ...TransitionPropsProp
      } = {},
      ...other
    } = props;
    const ownerState = {
      ...props,
      anchorOrigin: {
        vertical,
        horizontal
      },
      autoHideDuration,
      disableWindowBlurListener,
      TransitionComponent: TransitionComponentProp,
      transitionDuration
    };
    const classes = useUtilityClasses40(ownerState);
    const {
      getRootProps,
      onClickAway
    } = useSnackbar_default({
      ...ownerState
    });
    const [exited, setExited] = React102.useState(true);
    const handleExited = (node2) => {
      setExited(true);
      if (onExited) {
        onExited(node2);
      }
    };
    const handleEnter = (node2, isAppearing) => {
      setExited(false);
      if (onEnter) {
        onEnter(node2, isAppearing);
      }
    };
    const externalForwardedProps = {
      slots: {
        transition: TransitionComponentProp,
        ...slots
      },
      slotProps: {
        content: ContentPropsProp,
        clickAwayListener: ClickAwayListenerPropsProp,
        transition: TransitionPropsProp,
        ...slotProps
      }
    };
    const [Root, rootProps] = useSlot("root", {
      ref,
      className: [classes.root, className],
      elementType: SnackbarRoot,
      getSlotProps: getRootProps,
      externalForwardedProps: {
        ...externalForwardedProps,
        ...other
      },
      ownerState
    });
    const [ClickAwaySlot, {
      ownerState: clickAwayOwnerStateProp,
      ...clickAwayListenerProps
    }] = useSlot("clickAwayListener", {
      elementType: ClickAwayListener,
      externalForwardedProps,
      getSlotProps: (handlers) => ({
        onClickAway: (...params) => {
          const event = params[0];
          handlers.onClickAway?.(...params);
          if (event?.defaultMuiPrevented) {
            return;
          }
          onClickAway(...params);
        }
      }),
      ownerState
    });
    const [ContentSlot, contentSlotProps] = useSlot("content", {
      elementType: SnackbarContent_default,
      shouldForwardComponentProp: true,
      externalForwardedProps,
      additionalProps: {
        message,
        action
      },
      ownerState
    });
    const [TransitionSlot, transitionProps] = useSlot("transition", {
      elementType: Grow_default,
      externalForwardedProps,
      getSlotProps: (handlers) => ({
        onEnter: (...params) => {
          handlers.onEnter?.(...params);
          handleEnter(...params);
        },
        onExited: (...params) => {
          handlers.onExited?.(...params);
          handleExited(...params);
        }
      }),
      additionalProps: {
        appear: true,
        in: open,
        timeout: transitionDuration,
        direction: vertical === "top" ? "down" : "up"
      },
      ownerState
    });
    if (!open && exited) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(ClickAwaySlot, {
      ...clickAwayListenerProps,
      ...slots.clickAwayListener && {
        ownerState: clickAwayOwnerStateProp
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(Root, {
        ...rootProps,
        children: /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(TransitionSlot, {
          ...transitionProps,
          children: children || /* @__PURE__ */ (0, import_jsx_runtime69.jsx)(ContentSlot, {
            ...contentSlotProps
          })
        })
      })
    });
  });
  false ? Snackbar.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
     * The action to display. It renders after the message, at the end of the snackbar.
     */
    action: import_prop_types.default.node,
    /**
     * The anchor of the `Snackbar`.
     * On smaller screens, the component grows to occupy all the available width,
     * the horizontal alignment is ignored.
     * @default { vertical: 'bottom', horizontal: 'left' }
     */
    anchorOrigin: import_prop_types.default.shape({
      horizontal: import_prop_types.default.oneOf(["center", "left", "right"]).isRequired,
      vertical: import_prop_types.default.oneOf(["bottom", "top"]).isRequired
    }),
    /**
     * The number of milliseconds to wait before automatically calling the
     * `onClose` function. `onClose` should then set the state of the `open`
     * prop to hide the Snackbar. This behavior is disabled by default with
     * the `null` value.
     * @default null
     */
    autoHideDuration: import_prop_types.default.number,
    /**
     * Replace the `SnackbarContent` component.
     */
    children: import_prop_types.default.element,
    /**
     * Override or extend the styles applied to the component.
     */
    classes: import_prop_types.default.object,
     * @ignore
    className: import_prop_types.default.string,
     * Props applied to the `ClickAwayListener` element.
     * @deprecated Use `slotProps.clickAwayListener` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
    ClickAwayListenerProps: import_prop_types.default.object,
     * Props applied to the [`SnackbarContent`](https://mui.com/material-ui/api/snackbar-content/) element.
     * @deprecated Use `slotProps.content` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
    ContentProps: import_prop_types.default.object,
     * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
    disableWindowBlurListener: import_prop_types.default.bool,
     * When displaying multiple consecutive snackbars using a single parent-rendered
     * `<Snackbar/>`, add the `key` prop to ensure independent treatment of each message.
     * For instance, use `<Snackbar key={message} />`. Otherwise, messages might update
     * in place, and features like `autoHideDuration` could be affected.
    key: () => null,
     * The message to display.
    message: import_prop_types.default.node,
    /**
     * @ignore
     */
    onBlur: import_prop_types.default.func,
     * Typically `onClose` is used to set state in the parent component,
     * which is used to control the `Snackbar` `open` prop.
     * The `reason` parameter can optionally be used to control the response to `onClose`,
     * for example ignoring `clickaway`.
     * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
     * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
     * @ignore
    onFocus: import_prop_types.default.func,
    /**
     * @ignore
     */
    onMouseEnter: import_prop_types.default.func,
    /**
     * @ignore
     */
    onMouseLeave: import_prop_types.default.func,
     * The number of milliseconds to wait before dismissing after user interaction.
     * If `autoHideDuration` prop isn't specified, it does nothing.
     * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
     * we default to `autoHideDuration / 2` ms.
    resumeHideDuration: import_prop_types.default.number,
     * The props used for each slot inside.
     * @default {}
    slotProps: import_prop_types.default.shape({
      clickAwayListener: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.shape({
        children: import_prop_types.default.element.isRequired,
        disableReactTree: import_prop_types.default.bool,
        mouseEvent: import_prop_types.default.oneOf(["onClick", "onMouseDown", "onMouseUp", "onPointerDown", "onPointerUp", false]),
        onClickAway: import_prop_types.default.func,
        touchEvent: import_prop_types.default.oneOf(["onTouchEnd", "onTouchStart", false])
      })]),
      content: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
      root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
      transition: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
    }),
    /**
     * The components used for each slot inside.
     * @default {}
     */
    slots: import_prop_types.default.shape({
      clickAwayListener: import_prop_types.default.elementType,
      content: import_prop_types.default.elementType,
      root: import_prop_types.default.elementType,
      transition: import_prop_types.default.elementType
    }),
     * The component used for the transition.
     * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
     * @deprecated Use `slots.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
     * @default Grow
    TransitionComponent: import_prop_types.default.elementType,
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     * @default {
     *   enter: theme.transitions.duration.enteringScreen,
     *   exit: theme.transitions.duration.leavingScreen,
     * }
    transitionDuration: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
      appear: import_prop_types.default.number,
      enter: import_prop_types.default.number,
      exit: import_prop_types.default.number
    })]),
    /**
     * Props applied to the transition element.
     * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
     * @deprecated Use `slotProps.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
     * @default {}
     */
    TransitionProps: import_prop_types.default.object
  var Snackbar_default = Snackbar;
  var React103 = __toESM(require_react(), 1);
  var import_jsx_runtime70 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses41 = (ownerState) => {
  var Tab = /* @__PURE__ */ React103.forwardRef(function Tab2(inProps, ref) {
    const classes = useUtilityClasses41(ownerState);
    const icon = iconProp && label && /* @__PURE__ */ React103.isValidElement(iconProp) ? /* @__PURE__ */ React103.cloneElement(iconProp, {
    return /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(TabRoot, {
      children: [iconPosition === "top" || iconPosition === "start" ? /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(React103.Fragment, {
      }) : /* @__PURE__ */ (0, import_jsx_runtime70.jsxs)(React103.Fragment, {
  var React104 = __toESM(require_react(), 1);
  var import_jsx_runtime71 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses42 = (ownerState) => {
  var Toolbar = /* @__PURE__ */ React104.forwardRef(function Toolbar2(inProps, ref) {
    const classes = useUtilityClasses42(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime71.jsx)(ToolbarRoot, {
  var React105 = __toESM(require_react(), 1);
  var import_jsx_runtime72 = __toESM(require_jsx_runtime(), 1);
  var KeyboardArrowLeft_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime72.jsx)("path", {
  var React106 = __toESM(require_react(), 1);
  var import_jsx_runtime73 = __toESM(require_jsx_runtime(), 1);
  var KeyboardArrowRight_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime73.jsx)("path", {
  var React109 = __toESM(require_react(), 1);
  var React107 = __toESM(require_react(), 1);
  var import_jsx_runtime74 = __toESM(require_jsx_runtime(), 1);
    const scrollbarHeight = React107.useRef();
    const nodeRef = React107.useRef(null);
    React107.useEffect(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime74.jsx)("div", {
  var React108 = __toESM(require_react(), 1);
  var import_jsx_runtime75 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses43 = (ownerState) => {
  var TabScrollButton = /* @__PURE__ */ React108.forwardRef(function TabScrollButton2(inProps, ref) {
    const classes = useUtilityClasses43(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(TabScrollButtonRoot, {
      children: direction === "left" ? /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(StartButtonIcon, {
      }) : /* @__PURE__ */ (0, import_jsx_runtime75.jsx)(EndButtonIcon, {
  var import_jsx_runtime76 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses44 = (ownerState) => {
  var Tabs = /* @__PURE__ */ React109.forwardRef(function Tabs2(inProps, ref) {
    const classes = useUtilityClasses44(ownerState);
    const [mounted, setMounted] = React109.useState(false);
    const [indicatorStyle, setIndicatorStyle] = React109.useState(defaultIndicatorStyle);
    const [displayStartScroll, setDisplayStartScroll] = React109.useState(false);
    const [displayEndScroll, setDisplayEndScroll] = React109.useState(false);
    const [updateScrollObserver, setUpdateScrollObserver] = React109.useState(false);
    const [scrollerStyle, setScrollerStyle] = React109.useState({
    const tabsRef = React109.useRef(null);
    const tabListRef = React109.useRef(null);
    const handleScrollbarSizeChange = React109.useCallback((scrollbarWidth) => {
      conditionalElements2.scrollbarSizeListener = scrollable ? /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(ScrollbarSlot, {
      conditionalElements2.scrollButtonStart = showScrollButtons ? /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(ScrollButtonsSlot, {
      conditionalElements2.scrollButtonEnd = showScrollButtons ? /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(ScrollButtonsSlot, {
    React109.useEffect(() => {
    React109.useEffect(() => {
    React109.useEffect(() => {
    React109.useEffect(() => {
    React109.useEffect(() => {
    React109.useImperativeHandle(action, () => ({
    const indicator = /* @__PURE__ */ (0, import_jsx_runtime76.jsx)(IndicatorSlot, {
    const children = React109.Children.map(childrenProp, (child) => {
      if (!/* @__PURE__ */ React109.isValidElement(child)) {
      return /* @__PURE__ */ React109.cloneElement(child, {
    return /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)(RootSlot, {
      children: [conditionalElements.scrollButtonStart, conditionalElements.scrollbarSizeListener, /* @__PURE__ */ (0, import_jsx_runtime76.jsxs)(ScrollerSlot, {
        children: [/* @__PURE__ */ (0, import_jsx_runtime76.jsx)(ListSlot, {
  var React110 = __toESM(require_react(), 1);
  var import_jsx_runtime77 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses45 = (ownerState) => {
  var TextField = /* @__PURE__ */ React110.forwardRef(function TextField2(inProps, ref) {
    const classes = useUtilityClasses45(ownerState);
    const InputElement = /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(InputSlot, {
    return /* @__PURE__ */ (0, import_jsx_runtime77.jsxs)(RootSlot, {
      children: [label != null && label !== "" && /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(InputLabelSlot, {
      }), select ? /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(SelectSlot, {
      }) : InputElement, helperText && /* @__PURE__ */ (0, import_jsx_runtime77.jsx)(FormHelperTextSlot, {
  var import_jsx_runtime78 = __toESM(require_jsx_runtime(), 1);
  var AccountBalanceWallet_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime78.jsx)("path", {
  var import_jsx_runtime79 = __toESM(require_jsx_runtime(), 1);
  var AccountCircle_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime79.jsx)("path", {
  var import_jsx_runtime80 = __toESM(require_jsx_runtime(), 1);
  var AdminPanelSettings_default = createSvgIcon([/* @__PURE__ */ (0, import_jsx_runtime80.jsx)("path", {
  }, "0"), /* @__PURE__ */ (0, import_jsx_runtime80.jsx)("path", {
  var import_jsx_runtime81 = __toESM(require_jsx_runtime(), 1);
  var Delete_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime81.jsx)("path", {
  var import_jsx_runtime82 = __toESM(require_jsx_runtime(), 1);
  var Edit_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime82.jsx)("path", {
  var import_jsx_runtime83 = __toESM(require_jsx_runtime(), 1);
  var HowToReg_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime83.jsx)("path", {
  var import_jsx_runtime84 = __toESM(require_jsx_runtime(), 1);
  var Lock_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime84.jsx)("path", {
  var import_jsx_runtime85 = __toESM(require_jsx_runtime(), 1);
  var LockReset_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime85.jsx)("path", {
  var import_jsx_runtime86 = __toESM(require_jsx_runtime(), 1);
  var Login_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime86.jsx)("path", {
  var import_jsx_runtime87 = __toESM(require_jsx_runtime(), 1);
  var Logout_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime87.jsx)("path", {
  var import_jsx_runtime88 = __toESM(require_jsx_runtime(), 1);
  var PersonAdd_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime88.jsx)("path", {
  var import_jsx_runtime89 = __toESM(require_jsx_runtime(), 1);
  var SwapHoriz_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime89.jsx)("path", {
  var import_react11 = __toESM(require_react());

  // src/ToastContext.js
  var ToastContext = (0, import_react10.createContext)({ showToast: () => {
  } });
  function ToastProvider({ children }) {
    const [toast, setToast] = (0, import_react10.useState)({ open: false, message: "", severity: "info" });
    const showToast = (0, import_react10.useCallback)((message, severity = "info") => {
      setToast({ open: true, message, severity });
    }, []);
    const handleClose = (_, reason) => {
      if (reason === "clickaway") return;
      setToast((t) => ({ ...t, open: false }));
    };
    return /* @__PURE__ */ import_react10.default.createElement(ToastContext.Provider, { value: { showToast } }, children, /* @__PURE__ */ import_react10.default.createElement(
      Snackbar_default,
      {
        open: toast.open,
        autoHideDuration: 3e3,
        onClose: handleClose,
        anchorOrigin: { vertical: "bottom", horizontal: "center" }
      },
      /* @__PURE__ */ import_react10.default.createElement(Alert_default, { onClose: handleClose, severity: toast.severity, sx: { width: "100%" } }, toast.message)
    ));
  }

  // src/pages/Register.js
    const { showToast } = (0, import_react11.useContext)(ToastContext);
    const [form, setForm] = (0, import_react11.useState)({ username: "", password: "", confirmPassword: "", email: "", firstName: "", lastName: "" });
        showToast("All fields are required", "error");
        showToast("Passwords do not match", "error");
        showToast(err.response?.data?.message || "Registration failed", "error");
    return /* @__PURE__ */ import_react11.default.createElement(Box_default, { component: "form", onSubmit: submit, noValidate: true }, /* @__PURE__ */ import_react11.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Register"), /* @__PURE__ */ import_react11.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, ["username", "password", "confirmPassword", "email", "firstName", "lastName"].map((f) => /* @__PURE__ */ import_react11.default.createElement(
    )), /* @__PURE__ */ import_react11.default.createElement(Button_default, { type: "submit", variant: "contained" }, "Submit")));
  var import_react13 = __toESM(require_react());
  var import_react12 = __toESM(require_react());
  var AuthContext = (0, import_react12.createContext)(null);
    const [token2, setTokenState] = (0, import_react12.useState)(() => localStorage.getItem("token") || "");
    const [refreshToken, setRefreshTokenState] = (0, import_react12.useState)(() => localStorage.getItem("refreshToken") || "");
    const [currentOrg, setCurrentOrgState] = (0, import_react12.useState)(() => localStorage.getItem("currentOrg") || "");
    const [profile, setProfileState] = (0, import_react12.useState)(null);
    const [orgs, setOrgs] = (0, import_react12.useState)([]);
    (0, import_react12.useEffect)(() => {
    (0, import_react12.useEffect)(() => {
    (0, import_react12.useEffect)(() => {
    (0, import_react12.useEffect)(() => {
    (0, import_react12.useEffect)(() => {
    return /* @__PURE__ */ import_react12.default.createElement(AuthContext.Provider, { value: {
    const { login } = (0, import_react13.useContext)(AuthContext);
    const { showToast } = (0, import_react13.useContext)(ToastContext);
    const [username, setUsername] = (0, import_react13.useState)("");
    const [password, setPassword] = (0, import_react13.useState)("");
        showToast("Username and password are required", "error");
        showToast("Logged in", "success");
        showToast(err.response?.data?.message || "Login failed", "error");
    return /* @__PURE__ */ import_react13.default.createElement(Box_default, { component: "form", onSubmit: submit, noValidate: true }, /* @__PURE__ */ import_react13.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Login"), /* @__PURE__ */ import_react13.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, /* @__PURE__ */ import_react13.default.createElement(
    ), /* @__PURE__ */ import_react13.default.createElement(
    ), /* @__PURE__ */ import_react13.default.createElement(Button_default, { type: "submit", variant: "contained" }, "Submit"), /* @__PURE__ */ import_react13.default.createElement(Link_default, { href: "/forgot-password", underline: "hover" }, "Forgot password?")));
  var import_react14 = __toESM(require_react());
    const { showToast } = (0, import_react14.useContext)(ToastContext);
    const [form, setForm] = (0, import_react14.useState)({ username: "", password: "", confirmPassword: "", email: "", firstName: "", lastName: "" });
        showToast("All fields are required", "error");
        showToast("Passwords do not match", "error");
        showToast(err.response?.data?.message || "Creation failed", "error");
    return /* @__PURE__ */ import_react14.default.createElement(Box_default, { component: "form", onSubmit: submit, noValidate: true }, /* @__PURE__ */ import_react14.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Create Super Admin"), /* @__PURE__ */ import_react14.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, ["username", "password", "confirmPassword", "email", "firstName", "lastName"].map((f) => /* @__PURE__ */ import_react14.default.createElement(
    )), /* @__PURE__ */ import_react14.default.createElement(Button_default, { type: "submit", variant: "contained" }, "Submit")));
  var import_react15 = __toESM(require_react());
    (0, import_react15.useContext)(AuthContext);
    const [profile, setProfile] = (0, import_react15.useState)(null);
    (0, import_react15.useEffect)(() => {
    return /* @__PURE__ */ import_react15.default.createElement(Box_default, null, /* @__PURE__ */ import_react15.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Profile"), profile && /* @__PURE__ */ import_react15.default.createElement(Box_default, { sx: { border: "1px solid #ccc", p: 2, maxWidth: 400 } }, profile.profilePicture && /* @__PURE__ */ import_react15.default.createElement(
    ), /* @__PURE__ */ import_react15.default.createElement(Typography_default, null, /* @__PURE__ */ import_react15.default.createElement("strong", null, "Username:"), " ", profile.username), /* @__PURE__ */ import_react15.default.createElement(Typography_default, null, /* @__PURE__ */ import_react15.default.createElement("strong", null, "Email:"), " ", profile.email), /* @__PURE__ */ import_react15.default.createElement(Typography_default, null, /* @__PURE__ */ import_react15.default.createElement("strong", null, "Name:"), " ", profile.firstName, " ", profile.lastName), /* @__PURE__ */ import_react15.default.createElement(Typography_default, null, /* @__PURE__ */ import_react15.default.createElement("strong", null, "Roles:"), " ", profile.roles.join(", ")), /* @__PURE__ */ import_react15.default.createElement(Typography_default, { sx: { mt: 1 } }, /* @__PURE__ */ import_react15.default.createElement("strong", null, "Balances:")), /* @__PURE__ */ import_react15.default.createElement("ul", null, profile.balances.map((b) => /* @__PURE__ */ import_react15.default.createElement("li", { key: b.orgId }, b.orgName || "No organization", ": ", b.amount))), /* @__PURE__ */ import_react15.default.createElement(Typography_default, { sx: { mt: 1 } }, /* @__PURE__ */ import_react15.default.createElement("strong", null, "Organizations:")), /* @__PURE__ */ import_react15.default.createElement("ul", null, profile.organizations.map((o) => /* @__PURE__ */ import_react15.default.createElement("li", { key: o.id }, o.name)))));
  var import_react16 = __toESM(require_react());
    const { loadProfile, profile } = (0, import_react16.useContext)(AuthContext);
    const { showToast } = (0, import_react16.useContext)(ToastContext);
    const [form, setForm] = (0, import_react16.useState)({ username: "", firstName: "", lastName: "" });
    const [file, setFile] = (0, import_react16.useState)(null);
    const [preview, setPreview] = (0, import_react16.useState)("");
    (0, import_react16.useEffect)(() => {
        showToast("Profile updated", "success");
        showToast(err.response?.data?.message || "Update failed", "error");
    return /* @__PURE__ */ import_react16.default.createElement(Box_default, { component: "form", onSubmit: submit, noValidate: true }, /* @__PURE__ */ import_react16.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Update Profile"), /* @__PURE__ */ import_react16.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, ["username", "firstName", "lastName"].map((f) => /* @__PURE__ */ import_react16.default.createElement(
    )), /* @__PURE__ */ import_react16.default.createElement(Button_default, { variant: "contained", component: "label" }, "Upload Picture", /* @__PURE__ */ import_react16.default.createElement(
    )), (preview || profile?.profilePicture) && /* @__PURE__ */ import_react16.default.createElement(
    ), /* @__PURE__ */ import_react16.default.createElement(Button_default, { type: "submit", variant: "contained" }, "Submit")));
  var import_react17 = __toESM(require_react());
    (0, import_react17.useContext)(AuthContext);
    const { showToast } = (0, import_react17.useContext)(ToastContext);
    const [oldPassword, setOld] = (0, import_react17.useState)("");
    const [newPassword, setNew] = (0, import_react17.useState)("");
        showToast("Both fields are required", "error");
      showToast("Password changed", "success");
    return /* @__PURE__ */ import_react17.default.createElement(Box_default, { component: "form", onSubmit: submit, noValidate: true }, /* @__PURE__ */ import_react17.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Change Password"), /* @__PURE__ */ import_react17.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, /* @__PURE__ */ import_react17.default.createElement(
    ), /* @__PURE__ */ import_react17.default.createElement(
    ), /* @__PURE__ */ import_react17.default.createElement(Button_default, { type: "submit", variant: "contained" }, "Submit")));
  var import_react18 = __toESM(require_react());
    const { refreshOrgs, loadProfile } = (0, import_react18.useContext)(AuthContext);
    const { showToast } = (0, import_react18.useContext)(ToastContext);
    const [invites, setInvites] = (0, import_react18.useState)([]);
    const [tokens, setTokens] = (0, import_react18.useState)({});
    (0, import_react18.useEffect)(() => {
        showToast("Invite accepted", "success");
        showToast(err.response?.data?.message || "Error accepting invite", "error");
    const columns = import_react18.default.useMemo(() => [
        Cell: ({ row }) => /* @__PURE__ */ import_react18.default.createElement(TextField_default, { size: "small", value: tokens[row.original.id] || "", onChange: (e) => setTokens({ ...tokens, [row.original.id]: e.target.value }) })
        Cell: ({ row }) => /* @__PURE__ */ import_react18.default.createElement(Button_default, { variant: "contained", onClick: () => accept(row.original.id) }, "Accept")
    return /* @__PURE__ */ import_react18.default.createElement(Box_default, null, /* @__PURE__ */ import_react18.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Accept Invites"), /* @__PURE__ */ import_react18.default.createElement(Box_default, { component: "table", ...getTableProps(), sx: styles6.table }, /* @__PURE__ */ import_react18.default.createElement(Box_default, { component: "thead" }, headerGroups.map((hg) => /* @__PURE__ */ import_react18.default.createElement(Box_default, { component: "tr", ...hg.getHeaderGroupProps() }, hg.headers.map((col) => /* @__PURE__ */ import_react18.default.createElement(Box_default, { component: "th", ...col.getHeaderProps() }, col.render("Header")))))), /* @__PURE__ */ import_react18.default.createElement(Box_default, { component: "tbody", ...getTableBodyProps() }, rows.map((row) => {
      return /* @__PURE__ */ import_react18.default.createElement(Box_default, { component: "tr", ...row.getRowProps() }, row.cells.map((cell) => /* @__PURE__ */ import_react18.default.createElement(Box_default, { component: "td", ...cell.getCellProps() }, cell.render("Cell"))));
    }))));
  var import_react19 = __toESM(require_react());
    const [toUsername, setTo] = (0, import_react19.useState)("");
    const [amount, setAmount] = (0, import_react19.useState)("");
    const { showToast } = (0, import_react19.useContext)(ToastContext);
    const { currentOrg, loadProfile } = (0, import_react19.useContext)(AuthContext);
    const [balance, setBalance] = (0, import_react19.useState)(null);
    (0, import_react19.useEffect)(() => {
        showToast("Recipient, amount, and organization are required", "error");
        showToast("Transfer complete", "success");
        showToast(err.response?.data?.message || "Transfer failed", "error");
    if (!currentOrg) return /* @__PURE__ */ import_react19.default.createElement(Box_default, null);
    return /* @__PURE__ */ import_react19.default.createElement(Box_default, { component: "form", onSubmit: submit, noValidate: true }, /* @__PURE__ */ import_react19.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Transfer"), /* @__PURE__ */ import_react19.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, /* @__PURE__ */ import_react19.default.createElement(
    ), /* @__PURE__ */ import_react19.default.createElement(
    ), /* @__PURE__ */ import_react19.default.createElement(Button_default, { type: "submit", variant: "contained" }, "Submit"), balance !== null && /* @__PURE__ */ import_react19.default.createElement(Typography_default, null, "Current Balance: ", balance)));
  var import_react20 = __toESM(require_react());
    const { currentOrg } = (0, import_react20.useContext)(AuthContext);
    const [balance, setBalance] = (0, import_react20.useState)(null);
    (0, import_react20.useEffect)(() => {
    if (!currentOrg) return /* @__PURE__ */ import_react20.default.createElement(Box_default, null);
    return /* @__PURE__ */ import_react20.default.createElement(Box_default, null, /* @__PURE__ */ import_react20.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Balance"), balance !== null && /* @__PURE__ */ import_react20.default.createElement(Typography_default, null, "Current Balance: ", balance));
  var import_react25 = __toESM(require_react());
  var import_react21 = __toESM(require_react());
    const { currentOrg, profile, logout } = (0, import_react21.useContext)(AuthContext);
    const [users, setUsers] = (0, import_react21.useState)([]);
    const [roles, setRoles] = (0, import_react21.useState)([]);
    const [orgs, setOrgs] = (0, import_react21.useState)([]);
    const [addUserId, setAddUserId] = (0, import_react21.useState)("");
    const [removeUserId, setRemoveUserId] = (0, import_react21.useState)("");
    const [addOrgId, setAddOrgId] = (0, import_react21.useState)("");
    const [removeOrgId, setRemoveOrgId] = (0, import_react21.useState)("");
    const { showToast } = (0, import_react21.useContext)(ToastContext);
      const userReq = api_default.get("/users");
      const orgReq = api_default.get("/organizations");
      const [uRes, rRes, oRes] = await Promise.all([userReq, roleReq, orgReq]);
      setOrgs(oRes.data.map((o) => ({ id: o.id, name: o.name })));
    (0, import_react21.useEffect)(() => {
      const orgId = addOrgId;
      if (!addUserId || !orgId) {
        showToast("Select user and organization", "error");
      await api_default.post(`/organizations/${orgId}/members`, { userId: addUserId });
      showToast("Member added", "success");
      const orgId = currentOrg || removeOrgId;
      if (!removeUserId || !orgId) {
        showToast("Select user and organization", "error");
      await api_default.delete(`/organizations/${orgId}/members/${removeUserId}`);
      showToast("Member removed", "success");
        showToast(err.response?.data?.message || "Delete failed", "error");
    const columns = (0, import_react21.useMemo)(() => {
          Cell: ({ value }) => value ? /* @__PURE__ */ import_react21.default.createElement(Avatar_default, { src: value.startsWith("http") ? value : `${API_ROOT}${value}`, sx: { width: 32, height: 32 } }) : null
          Cell: ({ row }) => /* @__PURE__ */ import_react21.default.createElement(
            roles.map((r2) => /* @__PURE__ */ import_react21.default.createElement(MenuItem_default, { key: r2.id, value: r2.id }, r2.name))
        Cell: ({ row }) => /* @__PURE__ */ import_react21.default.createElement(IconButton_default, { color: "error", onClick: () => deleteUser(row.original.id) }, /* @__PURE__ */ import_react21.default.createElement(Delete_default, null))
    const filtered = (0, import_react21.useMemo)(
    const addOptions = (0, import_react21.useMemo)(
      () => currentOrg ? users.filter((u) => !u.organizations.some((o) => o.id === currentOrg)) : users.filter((u) => u.organizations.length === 0),
      [users, currentOrg]
    );
    const removeOptions = (0, import_react21.useMemo)(
      () => currentOrg ? users.filter((u) => u.organizations.some((o) => o.id === currentOrg)) : users.filter((u) => u.organizations.length === 0),
      [users, currentOrg]
    );
    return /* @__PURE__ */ import_react21.default.createElement(Box_default, null, /* @__PURE__ */ import_react21.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Manage Users"), /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "table", ...getTableProps(), sx: styles6.table }, /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "thead" }, headerGroups.map((hg) => /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "tr", ...hg.getHeaderGroupProps() }, hg.headers.map((col) => /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "th", ...col.getHeaderProps() }, col.render("Header")))))), /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "tbody", ...getTableBodyProps() }, rows.map((row) => {
      return /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "tr", ...row.getRowProps() }, row.cells.map((cell) => /* @__PURE__ */ import_react21.default.createElement(Box_default, { component: "td", ...cell.getCellProps() }, cell.render("Cell"))));
    }))), /* @__PURE__ */ import_react21.default.createElement(Box_default, { sx: styles6.actionRow }, !currentOrg && /* @__PURE__ */ import_react21.default.createElement(Stack_default, { direction: "row", spacing: 1, sx: { mt: 2 } }, /* @__PURE__ */ import_react21.default.createElement(
      Autocomplete_default,
      {
        options: orgs,
        getOptionLabel: (o) => o.name || "",
        onChange: (_, v) => setAddOrgId(v ? v.id : ""),
        renderInput: (params) => /* @__PURE__ */ import_react21.default.createElement(TextField_default, { ...params, size: "small", label: "Organization" }),
        sx: { width: 200 }
      }
    ), /* @__PURE__ */ import_react21.default.createElement(
        options: addOptions,
        renderInput: (params) => /* @__PURE__ */ import_react21.default.createElement(TextField_default, { ...params, size: "small", label: "User" }),
        sx: { width: 200 }
      }
    ), /* @__PURE__ */ import_react21.default.createElement(Button_default, { variant: "contained", onClick: addMember }, "Add Member")), /* @__PURE__ */ import_react21.default.createElement(Stack_default, { direction: "row", spacing: 1, sx: { mt: 2 } }, !currentOrg && /* @__PURE__ */ import_react21.default.createElement(
      Autocomplete_default,
      {
        options: orgs,
        getOptionLabel: (o) => o.name || "",
        onChange: (_, v) => setRemoveOrgId(v ? v.id : ""),
        renderInput: (params) => /* @__PURE__ */ import_react21.default.createElement(TextField_default, { ...params, size: "small", label: "Organization" }),
    ), /* @__PURE__ */ import_react21.default.createElement(
        options: removeOptions,
        renderInput: (params) => /* @__PURE__ */ import_react21.default.createElement(TextField_default, { ...params, size: "small", label: "User" }),
    ), /* @__PURE__ */ import_react21.default.createElement(Button_default, { variant: "contained", color: "error", onClick: removeMember }, "Remove Member"))));
  var import_react22 = __toESM(require_react());
    const { currentOrg } = (0, import_react22.useContext)(AuthContext);
    const { showToast } = (0, import_react22.useContext)(ToastContext);
    const [roles, setRoles] = (0, import_react22.useState)([]);
    const [newCode, setNewCode] = (0, import_react22.useState)("");
    const [newName, setNewName] = (0, import_react22.useState)("");
    (0, import_react22.useEffect)(() => {
        showToast(`${field === "code" ? "Code" : "Name"} is required`, "error");
      showToast("Role updated", "success");
      showToast("Role deleted", "success");
        showToast("Code and name are required", "error");
      showToast("Role created", "success");
    const columns = (0, import_react22.useMemo)(() => [
        Cell: ({ row }) => /* @__PURE__ */ import_react22.default.createElement(
        Cell: ({ row }) => /* @__PURE__ */ import_react22.default.createElement(
        Cell: ({ row }) => /* @__PURE__ */ import_react22.default.createElement(IconButton_default, { color: "error", disabled: row.original.system, onClick: () => deleteRole(row.original.id) }, /* @__PURE__ */ import_react22.default.createElement(Delete_default, null))
    return /* @__PURE__ */ import_react22.default.createElement(Box_default, null, /* @__PURE__ */ import_react22.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Manage Roles"), /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "table", ...getTableProps(), sx: styles6.table }, /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "thead" }, headerGroups.map((hg) => /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "tr", ...hg.getHeaderGroupProps() }, hg.headers.map((col) => /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "th", ...col.getHeaderProps() }, col.render("Header")))))), /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "tbody", ...getTableBodyProps() }, rows.map((row) => {
      return /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "tr", ...row.getRowProps() }, row.cells.map((cell) => /* @__PURE__ */ import_react22.default.createElement(Box_default, { component: "td", ...cell.getCellProps() }, cell.render("Cell"))));
    }))), /* @__PURE__ */ import_react22.default.createElement(Box_default, { sx: styles6.actionRow }, /* @__PURE__ */ import_react22.default.createElement(
    ), /* @__PURE__ */ import_react22.default.createElement(
    ), /* @__PURE__ */ import_react22.default.createElement(Button_default, { sx: styles6.ml1, variant: "contained", onClick: createRole }, "Add")));
  var import_react23 = __toESM(require_react());
    const { refreshOrgs, setCurrentOrg } = (0, import_react23.useContext)(AuthContext);
    const { showToast } = (0, import_react23.useContext)(ToastContext);
    const [orgs, setOrgs] = (0, import_react23.useState)([]);
    const [newName, setNewName] = (0, import_react23.useState)("");
    (0, import_react23.useEffect)(() => {
        showToast("Name is required", "error");
      showToast("Organization updated", "success");
        showToast("Name is required", "error");
      showToast("Organization created", "success");
      showToast("Organization deleted", "success");
      const [value, setValue] = (0, import_react23.useState)(row.original.name);
      return /* @__PURE__ */ import_react23.default.createElement(Stack_default, { direction: "row", spacing: 1 }, /* @__PURE__ */ import_react23.default.createElement(
      ), /* @__PURE__ */ import_react23.default.createElement(Button_default, { size: "small", variant: "contained", onClick: save }, "Change"));
    const columns = (0, import_react23.useMemo)(() => [
        Cell: ({ row }) => /* @__PURE__ */ import_react23.default.createElement(IconButton_default, { color: "error", onClick: () => deleteOrg(row.original.id) }, /* @__PURE__ */ import_react23.default.createElement(Delete_default, null))
    return /* @__PURE__ */ import_react23.default.createElement(Box_default, null, /* @__PURE__ */ import_react23.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Manage Organizations"), /* @__PURE__ */ import_react23.default.createElement(Box_default, { component: "table", ...getTableProps(), sx: styles6.table }, /* @__PURE__ */ import_react23.default.createElement(Box_default, { component: "thead" }, headerGroups.map((hg) => /* @__PURE__ */ import_react23.default.createElement(Box_default, { component: "tr", ...hg.getHeaderGroupProps() }, hg.headers.map((col) => /* @__PURE__ */ import_react23.default.createElement(Box_default, { component: "th", ...col.getHeaderProps() }, col.render("Header")))))), /* @__PURE__ */ import_react23.default.createElement(Box_default, { component: "tbody", ...getTableBodyProps() }, rows.map((row) => {
      return /* @__PURE__ */ import_react23.default.createElement(Box_default, { component: "tr", ...row.getRowProps() }, row.cells.map((cell) => /* @__PURE__ */ import_react23.default.createElement(Box_default, { component: "td", ...cell.getCellProps() }, cell.render("Cell"))));
    }))), /* @__PURE__ */ import_react23.default.createElement(Stack_default, { direction: "row", spacing: 1, sx: { mt: 2 } }, /* @__PURE__ */ import_react23.default.createElement(
    ), /* @__PURE__ */ import_react23.default.createElement(Button_default, { variant: "contained", onClick: createOrg }, "Create Organization")));
  var import_react24 = __toESM(require_react());
    const { currentOrg } = (0, import_react24.useContext)(AuthContext);
    const { showToast } = (0, import_react24.useContext)(ToastContext);
    const [invites, setInvites] = (0, import_react24.useState)([]);
    const [email, setEmail] = (0, import_react24.useState)("");
    const [role, setRole] = (0, import_react24.useState)("");
    const [roles, setRoles] = (0, import_react24.useState)([]);
    (0, import_react24.useEffect)(() => {
      showToast("Invite deleted", "success");
        showToast("Organization, email and role are required", "error");
      showToast("Invite sent", "success");
    const columns = (0, import_react24.useMemo)(() => [
        Cell: ({ row }) => /* @__PURE__ */ import_react24.default.createElement(IconButton_default, { color: "error", onClick: () => deleteInvite(row.original.id) }, /* @__PURE__ */ import_react24.default.createElement(Delete_default, null))
    return /* @__PURE__ */ import_react24.default.createElement(Box_default, null, /* @__PURE__ */ import_react24.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Manage Invites"), /* @__PURE__ */ import_react24.default.createElement(Box_default, { component: "table", ...getTableProps(), sx: styles6.table }, /* @__PURE__ */ import_react24.default.createElement(Box_default, { component: "thead" }, headerGroups.map((hg) => /* @__PURE__ */ import_react24.default.createElement(Box_default, { component: "tr", ...hg.getHeaderGroupProps() }, hg.headers.map((col) => /* @__PURE__ */ import_react24.default.createElement(Box_default, { component: "th", ...col.getHeaderProps() }, col.render("Header")))))), /* @__PURE__ */ import_react24.default.createElement(Box_default, { component: "tbody", ...getTableBodyProps() }, rows.map((row) => {
      return /* @__PURE__ */ import_react24.default.createElement(Box_default, { component: "tr", ...row.getRowProps() }, row.cells.map((cell) => /* @__PURE__ */ import_react24.default.createElement(Box_default, { component: "td", ...cell.getCellProps() }, cell.render("Cell"))));
    }))), /* @__PURE__ */ import_react24.default.createElement(Box_default, { sx: styles6.actionRow }, /* @__PURE__ */ import_react24.default.createElement(Box_default, { component: "form", onSubmit: sendInvite, noValidate: true, sx: { mt: 2 } }, /* @__PURE__ */ import_react24.default.createElement(Stack_default, { direction: "row", spacing: 1 }, /* @__PURE__ */ import_react24.default.createElement(
    ), /* @__PURE__ */ import_react24.default.createElement(
      roles.map((r2) => /* @__PURE__ */ import_react24.default.createElement(MenuItem_default, { key: r2.id, value: r2.code }, r2.name))
    ), /* @__PURE__ */ import_react24.default.createElement(Button_default, { type: "submit", variant: "contained" }, "Invite User")))));
    const { profile, currentOrg, isAdmin } = (0, import_react25.useContext)(AuthContext);
    const [tab, setTab] = (0, import_react25.useState)(0);
    if (!isAdmin) return /* @__PURE__ */ import_react25.default.createElement(Box_default, null, "Not authorized");
      tabs.push({ label, component: /* @__PURE__ */ import_react25.default.createElement(ManageUsers, null) });
    if (currentOrg) tabs.push({ label: "Roles", component: /* @__PURE__ */ import_react25.default.createElement(ManageRoles, null) });
    if (showOrgs) tabs.push({ label: "Organizations", component: /* @__PURE__ */ import_react25.default.createElement(ManageOrganizations, null) });
    if (currentOrg) tabs.push({ label: "Invites", component: /* @__PURE__ */ import_react25.default.createElement(ManageInvites, null) });
    return /* @__PURE__ */ import_react25.default.createElement(Box_default, null, /* @__PURE__ */ import_react25.default.createElement(Tabs_default, { value: tab, onChange: (_, v) => setTab(v) }, tabs.map((t) => /* @__PURE__ */ import_react25.default.createElement(Tab_default, { key: t.label, label: t.label }))), /* @__PURE__ */ import_react25.default.createElement(Box_default, { sx: styles6.actionRow }, tabs[tab]?.component));
  var import_react26 = __toESM(require_react());
    const [token2, setToken] = (0, import_react26.useState)("");
    const [password, setPassword] = (0, import_react26.useState)("");
    const { showToast } = (0, import_react26.useContext)(ToastContext);
        showToast("Token and new password are required", "error");
      showToast("Password reset", "success");
    return /* @__PURE__ */ import_react26.default.createElement(Box_default, { component: "form", onSubmit: submit, noValidate: true }, /* @__PURE__ */ import_react26.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Reset Password"), /* @__PURE__ */ import_react26.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, /* @__PURE__ */ import_react26.default.createElement(
    ), /* @__PURE__ */ import_react26.default.createElement(
    ), /* @__PURE__ */ import_react26.default.createElement(Button_default, { type: "submit", variant: "contained" }, "Submit")));
  var import_react27 = __toESM(require_react());
    const [username, setUsername] = (0, import_react27.useState)("");
    const [token2, setToken] = (0, import_react27.useState)("");
    const { showToast } = (0, import_react27.useContext)(ToastContext);
        showToast("Username is required", "error");
      showToast("Token created", "success");
    return /* @__PURE__ */ import_react27.default.createElement(Box_default, { component: "form", onSubmit: submit, noValidate: true }, /* @__PURE__ */ import_react27.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Forgot Password"), /* @__PURE__ */ import_react27.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, /* @__PURE__ */ import_react27.default.createElement(
    ), /* @__PURE__ */ import_react27.default.createElement(Button_default, { type: "submit", variant: "contained" }, "Request Reset Token"), token2 && /* @__PURE__ */ import_react27.default.createElement(Typography_default, null, "Reset Token: ", token2)));
  var import_react28 = __toESM(require_react());
    const { logout } = (0, import_react28.useContext)(AuthContext);
    (0, import_react28.useEffect)(() => {
      { text: "Register", path: "/register", icon: /* @__PURE__ */ import_react29.default.createElement(PersonAdd_default, null) },
      { text: "Login", path: "/login", icon: /* @__PURE__ */ import_react29.default.createElement(Login_default, null) },
      { text: "Create SuperAdmin", path: "/create-superadmin", icon: /* @__PURE__ */ import_react29.default.createElement(AdminPanelSettings_default, null) },
      { text: "Reset Password", path: "/reset-password", icon: /* @__PURE__ */ import_react29.default.createElement(LockReset_default, null) }
    const { token: token2, currentOrg, setCurrentOrg, profile, orgs, refreshOrgs, isAdmin } = (0, import_react29.useContext)(AuthContext);
      { text: "Profile", path: "/profile", icon: /* @__PURE__ */ import_react29.default.createElement(AccountCircle_default, null) },
      { text: "Update Profile", path: "/update-profile", icon: /* @__PURE__ */ import_react29.default.createElement(Edit_default, null) },
      { text: "Change Password", path: "/change-password", icon: /* @__PURE__ */ import_react29.default.createElement(Lock_default, null) },
      { text: "Accept Invite", path: "/accept-invite", icon: /* @__PURE__ */ import_react29.default.createElement(HowToReg_default, null) },
        { text: "Transfer", path: "/transfer", icon: /* @__PURE__ */ import_react29.default.createElement(SwapHoriz_default, null) },
        { text: "Balance", path: "/balance", icon: /* @__PURE__ */ import_react29.default.createElement(AccountBalanceWallet_default, null) }
      { text: "Logout", path: "/logout", icon: /* @__PURE__ */ import_react29.default.createElement(Logout_default, null) }
    const adminNav = { text: "Administration", path: "/admin", icon: /* @__PURE__ */ import_react29.default.createElement(AdminPanelSettings_default, null) };
    (0, import_react29.useEffect)(() => {
    return /* @__PURE__ */ import_react29.default.createElement(BrowserRouter, null, /* @__PURE__ */ import_react29.default.createElement(Box_default, { sx: styles6.root }, /* @__PURE__ */ import_react29.default.createElement(CssBaseline_default, null), /* @__PURE__ */ import_react29.default.createElement(AppBar_default, { position: "fixed", sx: styles6.appBar }, /* @__PURE__ */ import_react29.default.createElement(Toolbar_default, null, /* @__PURE__ */ import_react29.default.createElement(Typography_default, { variant: "h6", noWrap: true, component: "div", sx: { flexGrow: 1 } }, "Dashboard"), token2 && profile && /* @__PURE__ */ import_react29.default.createElement(Typography_default, { sx: { mr: 2, display: "flex", alignItems: "center" } }, profile.profilePicture && /* @__PURE__ */ import_react29.default.createElement(
    ), profile.firstName, " ", profile.lastName, " | ", profile.username, currentOrg && /* @__PURE__ */ import_react29.default.createElement(import_react29.default.Fragment, null, " | Current Balance: ", profile.balances.find((b) => b.orgId === currentOrg)?.amount ?? 0)), token2 && /* @__PURE__ */ import_react29.default.createElement(FormControl_default, { size: "small", sx: { minWidth: 120 } }, /* @__PURE__ */ import_react29.default.createElement(InputLabel_default, { id: "org-select-label", shrink: true }, "Organizations"), /* @__PURE__ */ import_react29.default.createElement(
      /* @__PURE__ */ import_react29.default.createElement(MenuItem_default, { value: "" }, "No organization"),
      orgs.map((o) => /* @__PURE__ */ import_react29.default.createElement(MenuItem_default, { key: o.id, value: o.id }, o.name))
    )))), /* @__PURE__ */ import_react29.default.createElement(
      /* @__PURE__ */ import_react29.default.createElement(Toolbar_default, null),
      /* @__PURE__ */ import_react29.default.createElement(List_default, null, navItems.map((item) => /* @__PURE__ */ import_react29.default.createElement(ListItem_default, { disablePadding: true, key: item.text }, /* @__PURE__ */ import_react29.default.createElement(ListItemButton_default, { component: Link, to: item.path }, /* @__PURE__ */ import_react29.default.createElement(ListItemIcon_default, null, item.icon), /* @__PURE__ */ import_react29.default.createElement(ListItemText_default, { primary: item.text })))))
    ), /* @__PURE__ */ import_react29.default.createElement(Box_default, { component: "main", sx: styles6.content }, /* @__PURE__ */ import_react29.default.createElement(Toolbar_default, null), /* @__PURE__ */ import_react29.default.createElement(Routes, null, /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/register", element: /* @__PURE__ */ import_react29.default.createElement(Register, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/login", element: /* @__PURE__ */ import_react29.default.createElement(Login, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/create-superadmin", element: /* @__PURE__ */ import_react29.default.createElement(CreateSuperAdmin, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/profile", element: /* @__PURE__ */ import_react29.default.createElement(Profile, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/update-profile", element: /* @__PURE__ */ import_react29.default.createElement(UpdateProfile, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/change-password", element: /* @__PURE__ */ import_react29.default.createElement(ChangePassword, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/accept-invite", element: /* @__PURE__ */ import_react29.default.createElement(AcceptInvite, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/transfer", element: /* @__PURE__ */ import_react29.default.createElement(Transfer, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/balance", element: /* @__PURE__ */ import_react29.default.createElement(Balance, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/admin", element: /* @__PURE__ */ import_react29.default.createElement(Administration, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/logout", element: /* @__PURE__ */ import_react29.default.createElement(Logout, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/forgot-password", element: /* @__PURE__ */ import_react29.default.createElement(ForgotPassword, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/reset-password", element: /* @__PURE__ */ import_react29.default.createElement(ResetPassword, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "/", element: token2 ? /* @__PURE__ */ import_react29.default.createElement(Balance, null) : /* @__PURE__ */ import_react29.default.createElement(Login, null) }), /* @__PURE__ */ import_react29.default.createElement(Route, { path: "*", element: /* @__PURE__ */ import_react29.default.createElement(Navigate, { to: "/", replace: true }) })))));
    /* @__PURE__ */ import_react30.default.createElement(AuthProvider, null, /* @__PURE__ */ import_react30.default.createElement(ToastProvider, null, /* @__PURE__ */ import_react30.default.createElement(App, null)))
