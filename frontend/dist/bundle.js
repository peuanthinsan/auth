  (function(_jsx73) {
    })(JSX || (JSX = _jsx73.JSX || (_jsx73.JSX = {})));
    const useUtilityClasses39 = () => {
      const classes = useUtilityClasses39();
  // node_modules/@mui/material/esm/Avatar/Avatar.js
  // node_modules/@mui/material/esm/internal/svg-icons/Person.js
  var Person_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", {
    d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
  }), "Person");

  // node_modules/@mui/material/esm/Avatar/avatarClasses.js
  function getAvatarUtilityClass(slot) {
    return generateUtilityClass("MuiAvatar", slot);
  }
  var avatarClasses = generateUtilityClasses("MuiAvatar", ["root", "colorDefault", "circular", "rounded", "square", "img", "fallback"]);

  // node_modules/@mui/material/esm/Avatar/Avatar.js
  var import_jsx_runtime24 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses9 = (ownerState) => {
    const {
      classes,
      variant,
      colorDefault
    } = ownerState;
    const slots = {
      root: ["root", variant, colorDefault && "colorDefault"],
      img: ["img"],
      fallback: ["fallback"]
    };
    return composeClasses(slots, getAvatarUtilityClass, classes);
  };
  var AvatarRoot = styled_default2("div", {
    name: "MuiAvatar",
    slot: "Root",
    overridesResolver: (props, styles7) => {
      const {
        ownerState
      } = props;
      return [styles7.root, styles7[ownerState.variant], ownerState.colorDefault && styles7.colorDefault];
    }
  })(memoTheme_default(({
    theme
  }) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(20),
    lineHeight: 1,
    borderRadius: "50%",
    overflow: "hidden",
    userSelect: "none",
    variants: [{
      props: {
        variant: "rounded"
      },
      style: {
        borderRadius: (theme.vars || theme).shape.borderRadius
      }
    }, {
      props: {
        variant: "square"
      },
      style: {
        borderRadius: 0
      }
    }, {
      props: {
        colorDefault: true
      },
      style: {
        color: (theme.vars || theme).palette.background.default,
        ...theme.vars ? {
          backgroundColor: theme.vars.palette.Avatar.defaultBg
        } : {
          backgroundColor: theme.palette.grey[400],
          ...theme.applyStyles("dark", {
            backgroundColor: theme.palette.grey[600]
          })
        }
      }
    }]
  })));
  var AvatarImg = styled_default2("img", {
    name: "MuiAvatar",
    slot: "Img"
  })({
    width: "100%",
    height: "100%",
    textAlign: "center",
    // Handle non-square image.
    objectFit: "cover",
    // Hide alt text.
    color: "transparent",
    // Hide the image broken icon, only works on Chrome.
    textIndent: 1e4
  });
  var AvatarFallback = styled_default2(Person_default, {
    name: "MuiAvatar",
    slot: "Fallback"
  })({
    width: "75%",
    height: "75%"
  });
  function useLoaded({
    crossOrigin,
    referrerPolicy,
    src,
    srcSet
  }) {
    const [loaded, setLoaded] = React49.useState(false);
    React49.useEffect(() => {
      if (!src && !srcSet) {
        return void 0;
      }
      setLoaded(false);
      let active = true;
      const image = new Image();
      image.onload = () => {
        if (!active) {
          return;
        }
        setLoaded("loaded");
      };
      image.onerror = () => {
        if (!active) {
          return;
        }
        setLoaded("error");
      };
      image.crossOrigin = crossOrigin;
      image.referrerPolicy = referrerPolicy;
      image.src = src;
      if (srcSet) {
        image.srcset = srcSet;
      }
      return () => {
        active = false;
      };
    }, [crossOrigin, referrerPolicy, src, srcSet]);
    return loaded;
  }
  var Avatar = /* @__PURE__ */ React49.forwardRef(function Avatar2(inProps, ref) {
    const props = useDefaultProps2({
      props: inProps,
      name: "MuiAvatar"
    });
    const {
      alt,
      children: childrenProp,
      className,
      component = "div",
      slots = {},
      slotProps = {},
      imgProps,
      sizes,
      src,
      srcSet,
      variant = "circular",
      ...other
    } = props;
    let children = null;
    const ownerState = {
      ...props,
      component,
      variant
    };
    const loaded = useLoaded({
      ...imgProps,
      ...typeof slotProps.img === "function" ? slotProps.img(ownerState) : slotProps.img,
      src,
      srcSet
    });
    const hasImg = src || srcSet;
    const hasImgNotFailing = hasImg && loaded !== "error";
    ownerState.colorDefault = !hasImgNotFailing;
    delete ownerState.ownerState;
    const classes = useUtilityClasses9(ownerState);
    const [RootSlot, rootSlotProps] = useSlot("root", {
      ref,
      className: clsx_default(classes.root, className),
      elementType: AvatarRoot,
      externalForwardedProps: {
        slots,
        slotProps,
        component,
        ...other
      },
      ownerState
    });
    const [ImgSlot, imgSlotProps] = useSlot("img", {
      className: classes.img,
      elementType: AvatarImg,
      externalForwardedProps: {
        slots,
        slotProps: {
          img: {
            ...imgProps,
            ...slotProps.img
          }
        }
      },
      additionalProps: {
        alt,
        src,
        srcSet,
        sizes
      },
      ownerState
    });
    const [FallbackSlot, fallbackSlotProps] = useSlot("fallback", {
      className: classes.fallback,
      elementType: AvatarFallback,
      externalForwardedProps: {
        slots,
        slotProps
      },
      shouldForwardComponentProp: true,
      ownerState
    });
    if (hasImgNotFailing) {
      children = /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(ImgSlot, {
        ...imgSlotProps
      });
    } else if (!!childrenProp || childrenProp === 0) {
      children = childrenProp;
    } else if (hasImg && alt) {
      children = alt[0];
    } else {
      children = /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(FallbackSlot, {
        ...fallbackSlotProps
      });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(RootSlot, {
      ...rootSlotProps,
      children
    });
  });
  false ? Avatar.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
     * Used in combination with `src` or `srcSet` to
     * provide an alt attribute for the rendered `img` element.
     */
    alt: import_prop_types.default.string,
    /**
     * Used to render icon or text elements inside the Avatar if `src` is not set.
     * This can be an element, or just a string.
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
     * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#attributes) applied to the `img` element if the component is used to display an image.
     * It can be used to listen for the loading error event.
     * @deprecated Use `slotProps.img` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
     */
    imgProps: import_prop_types.default.object,
    /**
     * The `sizes` attribute for the `img` element.
     */
    sizes: import_prop_types.default.string,
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps: import_prop_types.default.shape({
      fallback: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
      img: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object]),
      root: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object])
    }),
    /**
     * The components used for each slot inside.
     * @default {}
     */
    slots: import_prop_types.default.shape({
      fallback: import_prop_types.default.elementType,
      img: import_prop_types.default.elementType,
      root: import_prop_types.default.elementType
    }),
    /**
     * The `src` attribute for the `img` element.
     */
    src: import_prop_types.default.string,
    /**
     * The `srcSet` attribute for the `img` element.
     * Use this attribute for responsive image display.
     */
    srcSet: import_prop_types.default.string,
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
    /**
     * The shape of the avatar.
     * @default 'circular'
     */
    variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["circular", "rounded", "square"]), import_prop_types.default.string])
  } : void 0;
  var Avatar_default = Avatar;

  // node_modules/@mui/material/esm/Backdrop/Backdrop.js
  var React51 = __toESM(require_react(), 1);

  // node_modules/@mui/material/esm/Fade/Fade.js
  var React50 = __toESM(require_react(), 1);
  var import_jsx_runtime25 = __toESM(require_jsx_runtime(), 1);
  var Fade = /* @__PURE__ */ React50.forwardRef(function Fade2(props, ref) {
    const nodeRef = React50.useRef(null);
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(TransitionComponent, {
        return /* @__PURE__ */ React50.cloneElement(children, {
  var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses10 = (ownerState) => {
  var Backdrop = /* @__PURE__ */ React51.forwardRef(function Backdrop2(inProps, ref) {
    const classes = useUtilityClasses10(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(TransitionSlot, {
      children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(RootSlot, {
  var React54 = __toESM(require_react(), 1);
  var React52 = __toESM(require_react(), 1);
  var ButtonGroupContext = /* @__PURE__ */ React52.createContext({});
  var React53 = __toESM(require_react(), 1);
  var ButtonGroupButtonContext = /* @__PURE__ */ React53.createContext(void 0);
  var import_jsx_runtime27 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses11 = (ownerState) => {
  var Button = /* @__PURE__ */ React54.forwardRef(function Button2(inProps, ref) {
    const contextProps = React54.useContext(ButtonGroupContext_default);
    const buttonGroupButtonContextPositionClassName = React54.useContext(ButtonGroupButtonContext_default);
    const loadingIndicator = loadingIndicatorProp ?? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(CircularProgress_default, {
    const classes = useUtilityClasses11(ownerState);
    const startIcon = (startIconProp || loading && loadingPosition === "start") && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(ButtonStartIcon, {
      children: startIconProp || /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(ButtonLoadingIconPlaceholder, {
    const endIcon = (endIconProp || loading && loadingPosition === "end") && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(ButtonEndIcon, {
      children: endIconProp || /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(ButtonLoadingIconPlaceholder, {
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", {
        children: loading && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(ButtonLoadingIndicator, {
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(ButtonRoot, {
  var React55 = __toESM(require_react(), 1);
  var import_jsx_runtime28 = __toESM(require_jsx_runtime(), 1);
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(React55.Fragment, {
      children: [isDynamicSupport && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(GlobalStyles4, {
      }), !isDynamicSupport && !enableColorScheme && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", {
  var React58 = __toESM(require_react(), 1);
  var React56 = __toESM(require_react(), 1);
  var import_jsx_runtime29 = __toESM(require_jsx_runtime(), 1);
    const ignoreNextEnforceFocus = React56.useRef(false);
    const sentinelStart = React56.useRef(null);
    const sentinelEnd = React56.useRef(null);
    const nodeToRestore = React56.useRef(null);
    const reactFocusEventTarget = React56.useRef(null);
    const activated = React56.useRef(false);
    const rootRef = React56.useRef(null);
    const lastKeydown = React56.useRef(null);
    React56.useEffect(() => {
    React56.useEffect(() => {
    React56.useEffect(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(React56.Fragment, {
      children: [/* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", {
      }), /* @__PURE__ */ React56.cloneElement(children, {
      }), /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", {
  var React57 = __toESM(require_react(), 1);
    const modal = React57.useRef({});
    const mountNodeRef = React57.useRef(null);
    const modalRef = React57.useRef(null);
    const [exited, setExited] = React57.useState(!open);
    const handleClose = React57.useCallback(() => {
    React57.useEffect(() => {
    React57.useEffect(() => {
  var import_jsx_runtime30 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses12 = (ownerState) => {
  var Modal = /* @__PURE__ */ React58.forwardRef(function Modal2(inProps, ref) {
    const classes = useUtilityClasses12(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Portal_default, {
      children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(RootSlot, {
        children: [!hideBackdrop && BackdropComponent ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(BackdropSlot, {
        }) : null, /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(FocusTrap_default, {
          children: /* @__PURE__ */ React58.cloneElement(children, childProps)
  var React60 = __toESM(require_react(), 1);
  var React59 = __toESM(require_react(), 1);
  var import_jsx_runtime31 = __toESM(require_jsx_runtime(), 1);
  var Slide = /* @__PURE__ */ React59.forwardRef(function Slide2(props, ref) {
    const childrenRef = React59.useRef(null);
    const updatePosition = React59.useCallback(() => {
    React59.useEffect(() => {
    React59.useEffect(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(TransitionComponent, {
        return /* @__PURE__ */ React59.cloneElement(children, {
  var import_jsx_runtime32 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses13 = (ownerState) => {
  var Drawer = /* @__PURE__ */ React60.forwardRef(function Drawer2(inProps, ref) {
    const mounted = React60.useRef(false);
    React60.useEffect(() => {
    const classes = useUtilityClasses13(ownerState);
    const drawer = /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(PaperSlot, {
      return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(DockedSlot, {
    const slidingDrawer = /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(TransitionSlot, {
      return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(DockedSlot, {
    return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(RootSlot, {
  var React61 = __toESM(require_react(), 1);
  var import_jsx_runtime33 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses14 = (ownerState) => {
  var FilledInput = /* @__PURE__ */ React61.forwardRef(function FilledInput2(inProps, ref) {
    const classes = useUtilityClasses14(props);
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(InputBase_default, {
  var React62 = __toESM(require_react(), 1);
  var import_jsx_runtime34 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses15 = (ownerState) => {
  var FormControl = /* @__PURE__ */ React62.forwardRef(function FormControl2(inProps, ref) {
    const classes = useUtilityClasses15(ownerState);
    const [adornedStart, setAdornedStart] = React62.useState(() => {
        React62.Children.forEach(children, (child) => {
    const [filled, setFilled] = React62.useState(() => {
        React62.Children.forEach(children, (child) => {
    const [focusedState, setFocused] = React62.useState(false);
    const registeredInput = React62.useRef(false);
    const onFilled = React62.useCallback(() => {
    const onEmpty = React62.useCallback(() => {
    const childContext = React62.useMemo(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(FormControlContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(FormControlRoot, {
  var React63 = __toESM(require_react(), 1);
  var import_jsx_runtime35 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses16 = (ownerState) => {
  var FormHelperText = /* @__PURE__ */ React63.forwardRef(function FormHelperText2(inProps, ref) {
    const classes = useUtilityClasses16(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(FormHelperTextRoot, {
        _span || (_span = /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("span", {
  var React64 = __toESM(require_react(), 1);
  var import_jsx_runtime36 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses17 = (ownerState) => {
  var FormLabel = /* @__PURE__ */ React64.forwardRef(function FormLabel2(inProps, ref) {
    const classes = useUtilityClasses17(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(FormLabelRoot, {
      children: [children, fcs.required && /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(AsteriskComponent, {
  var React65 = __toESM(require_react(), 1);
  var import_jsx_runtime37 = __toESM(require_jsx_runtime(), 1);
  var Grow = /* @__PURE__ */ React65.forwardRef(function Grow2(props, ref) {
    const autoTimeout = React65.useRef();
    const nodeRef = React65.useRef(null);
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(TransitionComponent, {
        return /* @__PURE__ */ React65.cloneElement(children, {
  var React66 = __toESM(require_react(), 1);
  var import_jsx_runtime38 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses18 = (ownerState) => {
  var Input = /* @__PURE__ */ React66.forwardRef(function Input2(inProps, ref) {
    const classes = useUtilityClasses18(props);
    return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(InputBase_default, {
  var React67 = __toESM(require_react(), 1);
  var import_jsx_runtime39 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses19 = (ownerState) => {
  var InputLabel = /* @__PURE__ */ React67.forwardRef(function InputLabel2(inProps, ref) {
    const classes = useUtilityClasses19(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(InputLabelRoot, {
  var React68 = __toESM(require_react(), 1);
  var import_jsx_runtime40 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses20 = (ownerState) => {
  var Link2 = /* @__PURE__ */ React68.forwardRef(function Link3(inProps, ref) {
    const [focusVisible, setFocusVisible] = React68.useState(false);
    const classes = useUtilityClasses20(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(LinkRoot, {
  var React70 = __toESM(require_react(), 1);
  var React69 = __toESM(require_react(), 1);
  var ListContext = /* @__PURE__ */ React69.createContext({});
  var import_jsx_runtime41 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses21 = (ownerState) => {
  var List = /* @__PURE__ */ React70.forwardRef(function List2(inProps, ref) {
    const context = React70.useMemo(() => ({
    const classes = useUtilityClasses21(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(ListContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(ListRoot, {
  var React73 = __toESM(require_react(), 1);
  var React71 = __toESM(require_react(), 1);
  var import_jsx_runtime42 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses22 = (ownerState) => {
  var ListItemButton = /* @__PURE__ */ React71.forwardRef(function ListItemButton2(inProps, ref) {
    const context = React71.useContext(ListContext_default);
    const childContext = React71.useMemo(() => ({
    const listItemRef = React71.useRef(null);
    const classes = useUtilityClasses22(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(ListContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(ListItemButtonRoot, {
  var React72 = __toESM(require_react(), 1);
  var import_jsx_runtime43 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses23 = (ownerState) => {
  var ListItemSecondaryAction = /* @__PURE__ */ React72.forwardRef(function ListItemSecondaryAction2(inProps, ref) {
    const context = React72.useContext(ListContext_default);
    const classes = useUtilityClasses23(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(ListItemSecondaryActionRoot, {
  var import_jsx_runtime44 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses24 = (ownerState) => {
  var ListItem = /* @__PURE__ */ React73.forwardRef(function ListItem2(inProps, ref) {
    const context = React73.useContext(ListContext_default);
    const childContext = React73.useMemo(() => ({
    const listItemRef = React73.useRef(null);
    const children = React73.Children.toArray(childrenProp);
    const classes = useUtilityClasses24(ownerState);
      return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(ListContext_default.Provider, {
        children: /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(ListItemContainer, {
          children: [/* @__PURE__ */ (0, import_jsx_runtime44.jsx)(Root, {
    return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(ListContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)(Root, {
        children: [children, secondaryAction && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(ListItemSecondaryAction_default, {
      const children = React73.Children.toArray(props.children);
  var React74 = __toESM(require_react(), 1);
  var import_jsx_runtime45 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses25 = (ownerState) => {
  var ListItemIcon = /* @__PURE__ */ React74.forwardRef(function ListItemIcon2(inProps, ref) {
    const context = React74.useContext(ListContext_default);
    const classes = useUtilityClasses25(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(ListItemIconRoot, {
  var React75 = __toESM(require_react(), 1);
  var import_jsx_runtime46 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses26 = (ownerState) => {
  var ListItemText = /* @__PURE__ */ React75.forwardRef(function ListItemText2(inProps, ref) {
    } = React75.useContext(ListContext_default);
    const classes = useUtilityClasses26(ownerState);
      primary = /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(PrimarySlot, {
      secondary = /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(SecondarySlot, {
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(RootSlot, {
  var React78 = __toESM(require_react(), 1);
  var React76 = __toESM(require_react(), 1);
  var import_jsx_runtime47 = __toESM(require_jsx_runtime(), 1);
  var MenuList = /* @__PURE__ */ React76.forwardRef(function MenuList2(props, ref) {
    const listRef = React76.useRef(null);
    const textCriteriaRef = React76.useRef({
    React76.useImperativeHandle(actions, () => ({
    React76.Children.forEach(children, (child, index) => {
      if (!/* @__PURE__ */ React76.isValidElement(child)) {
    const items = React76.Children.map(children, (child, index) => {
        return /* @__PURE__ */ React76.cloneElement(child, newChildProps);
    return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(List_default, {
  var React77 = __toESM(require_react(), 1);
  var import_jsx_runtime48 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses27 = (ownerState) => {
  var Popover = /* @__PURE__ */ React77.forwardRef(function Popover2(inProps, ref) {
    const paperRef = React77.useRef();
    const classes = useUtilityClasses27(ownerState);
    const getAnchorOffset = React77.useCallback(() => {
    const getTransformOrigin = React77.useCallback((elemRect) => {
    const getPositioningStyle = React77.useCallback((element) => {
    const [isPositioned, setIsPositioned] = React77.useState(open);
    const setPositioningStyles = React77.useCallback(() => {
    React77.useEffect(() => {
    React77.useEffect(() => {
    React77.useImperativeHandle(action, () => open ? {
    React77.useEffect(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(RootSlot, {
      children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(TransitionSlot, {
        children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(PaperSlot, {
  var import_jsx_runtime49 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses28 = (ownerState) => {
  var Menu = /* @__PURE__ */ React78.forwardRef(function Menu2(inProps, ref) {
    const classes = useUtilityClasses28(ownerState);
    const menuListActionsRef = React78.useRef(null);
    React78.Children.map(children, (child, index) => {
      if (!/* @__PURE__ */ React78.isValidElement(child)) {
    return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(MenuRoot, {
      children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(ListSlot, {
  var React79 = __toESM(require_react(), 1);
  var import_jsx_runtime50 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses29 = (ownerState) => {
  var MenuItem = /* @__PURE__ */ React79.forwardRef(function MenuItem2(inProps, ref) {
    const context = React79.useContext(ListContext_default);
    const childContext = React79.useMemo(() => ({
    const menuItemRef = React79.useRef(null);
    const classes = useUtilityClasses29(props);
    return /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(ListContext_default.Provider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(MenuItemRoot, {
  var React80 = __toESM(require_react(), 1);
  var import_jsx_runtime51 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses30 = (ownerState) => {
  var NativeSelectInput = /* @__PURE__ */ React80.forwardRef(function NativeSelectInput2(props, ref) {
    const classes = useUtilityClasses30(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)(React80.Fragment, {
      children: [/* @__PURE__ */ (0, import_jsx_runtime51.jsx)(NativeSelectSelect, {
      }), props.multiple ? null : /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(NativeSelectIcon, {
  var React82 = __toESM(require_react(), 1);
  var React81 = __toESM(require_react(), 1);
  var import_jsx_runtime52 = __toESM(require_jsx_runtime(), 1);
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(NotchedOutlineRoot, {
      children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(NotchedOutlineLegend, {
        children: withLabel ? /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("span", {
          _span2 || (_span2 = /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("span", {
  var import_jsx_runtime53 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses31 = (ownerState) => {
  var OutlinedInput = /* @__PURE__ */ React82.forwardRef(function OutlinedInput2(inProps, ref) {
    const classes = useUtilityClasses31(props);
        label: label != null && label !== "" && fcs.required ? /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(React82.Fragment, {
    return /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(InputBase_default, {
      renderSuffix: (state) => /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(NotchedSlot, {
  var React84 = __toESM(require_react(), 1);
  var React83 = __toESM(require_react(), 1);
  var import_jsx_runtime54 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses32 = (ownerState) => {
  var SelectInput = /* @__PURE__ */ React83.forwardRef(function SelectInput2(props, ref) {
    const inputRef = React83.useRef(null);
    const displayRef = React83.useRef(null);
    const [displayNode, setDisplayNode] = React83.useState(null);
    } = React83.useRef(openProp != null);
    const [menuMinWidthState, setMenuMinWidthState] = React83.useState();
    const handleDisplayRef = React83.useCallback((node2) => {
    React83.useImperativeHandle(handleRef, () => ({
    React83.useEffect(() => {
    React83.useEffect(() => {
    React83.useEffect(() => {
    const childrenArray = React83.Children.toArray(children);
      if (!/* @__PURE__ */ React83.isValidElement(child)) {
      return /* @__PURE__ */ React83.cloneElement(child, {
      React83.useEffect(() => {
    const classes = useUtilityClasses32(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(React83.Fragment, {
      children: [/* @__PURE__ */ (0, import_jsx_runtime54.jsx)(SelectSelect, {
          _span3 || (_span3 = /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", {
      }), /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(SelectNativeInput, {
      }), /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(SelectIcon, {
      }), /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(Menu_default, {
  var import_jsx_runtime55 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses33 = (ownerState) => {
  var Select = /* @__PURE__ */ React84.forwardRef(function Select2(inProps, ref) {
    const classes = useUtilityClasses33(ownerState);
      standard: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(StyledInput, {
      outlined: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(StyledOutlinedInput, {
      filled: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(StyledFilledInput, {
    return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(React84.Fragment, {
      children: /* @__PURE__ */ React84.cloneElement(InputComponent, {
  var React85 = __toESM(require_react(), 1);
  var import_jsx_runtime56 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses34 = (ownerState) => {
  var Tab = /* @__PURE__ */ React85.forwardRef(function Tab2(inProps, ref) {
    const classes = useUtilityClasses34(ownerState);
    const icon = iconProp && label && /* @__PURE__ */ React85.isValidElement(iconProp) ? /* @__PURE__ */ React85.cloneElement(iconProp, {
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(TabRoot, {
      children: [iconPosition === "top" || iconPosition === "start" ? /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(React85.Fragment, {
      }) : /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)(React85.Fragment, {
  var React86 = __toESM(require_react(), 1);
  var import_jsx_runtime57 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses35 = (ownerState) => {
  var Toolbar = /* @__PURE__ */ React86.forwardRef(function Toolbar2(inProps, ref) {
    const classes = useUtilityClasses35(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(ToolbarRoot, {
  var React87 = __toESM(require_react(), 1);
  var import_jsx_runtime58 = __toESM(require_jsx_runtime(), 1);
  var KeyboardArrowLeft_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime58.jsx)("path", {
  var React88 = __toESM(require_react(), 1);
  var import_jsx_runtime59 = __toESM(require_jsx_runtime(), 1);
  var KeyboardArrowRight_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime59.jsx)("path", {
  var React91 = __toESM(require_react(), 1);
  var React89 = __toESM(require_react(), 1);
  var import_jsx_runtime60 = __toESM(require_jsx_runtime(), 1);
    const scrollbarHeight = React89.useRef();
    const nodeRef = React89.useRef(null);
    React89.useEffect(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime60.jsx)("div", {
  var React90 = __toESM(require_react(), 1);
  var import_jsx_runtime61 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses36 = (ownerState) => {
  var TabScrollButton = /* @__PURE__ */ React90.forwardRef(function TabScrollButton2(inProps, ref) {
    const classes = useUtilityClasses36(ownerState);
    return /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(TabScrollButtonRoot, {
      children: direction === "left" ? /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(StartButtonIcon, {
      }) : /* @__PURE__ */ (0, import_jsx_runtime61.jsx)(EndButtonIcon, {
  var import_jsx_runtime62 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses37 = (ownerState) => {
  var Tabs = /* @__PURE__ */ React91.forwardRef(function Tabs2(inProps, ref) {
    const classes = useUtilityClasses37(ownerState);
    const [mounted, setMounted] = React91.useState(false);
    const [indicatorStyle, setIndicatorStyle] = React91.useState(defaultIndicatorStyle);
    const [displayStartScroll, setDisplayStartScroll] = React91.useState(false);
    const [displayEndScroll, setDisplayEndScroll] = React91.useState(false);
    const [updateScrollObserver, setUpdateScrollObserver] = React91.useState(false);
    const [scrollerStyle, setScrollerStyle] = React91.useState({
    const tabsRef = React91.useRef(null);
    const tabListRef = React91.useRef(null);
    const handleScrollbarSizeChange = React91.useCallback((scrollbarWidth) => {
      conditionalElements2.scrollbarSizeListener = scrollable ? /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ScrollbarSlot, {
      conditionalElements2.scrollButtonStart = showScrollButtons ? /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ScrollButtonsSlot, {
      conditionalElements2.scrollButtonEnd = showScrollButtons ? /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ScrollButtonsSlot, {
    React91.useEffect(() => {
    React91.useEffect(() => {
    React91.useEffect(() => {
    React91.useEffect(() => {
    React91.useEffect(() => {
    React91.useImperativeHandle(action, () => ({
    const indicator = /* @__PURE__ */ (0, import_jsx_runtime62.jsx)(IndicatorSlot, {
    const children = React91.Children.map(childrenProp, (child) => {
      if (!/* @__PURE__ */ React91.isValidElement(child)) {
      return /* @__PURE__ */ React91.cloneElement(child, {
    return /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(RootSlot, {
      children: [conditionalElements.scrollButtonStart, conditionalElements.scrollbarSizeListener, /* @__PURE__ */ (0, import_jsx_runtime62.jsxs)(ScrollerSlot, {
        children: [/* @__PURE__ */ (0, import_jsx_runtime62.jsx)(ListSlot, {
  var React92 = __toESM(require_react(), 1);
  var import_jsx_runtime63 = __toESM(require_jsx_runtime(), 1);
  var useUtilityClasses38 = (ownerState) => {
  var TextField = /* @__PURE__ */ React92.forwardRef(function TextField2(inProps, ref) {
    const classes = useUtilityClasses38(ownerState);
    const InputElement = /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(InputSlot, {
    return /* @__PURE__ */ (0, import_jsx_runtime63.jsxs)(RootSlot, {
      children: [label != null && label !== "" && /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(InputLabelSlot, {
      }), select ? /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(SelectSlot, {
      }) : InputElement, helperText && /* @__PURE__ */ (0, import_jsx_runtime63.jsx)(FormHelperTextSlot, {
  var import_jsx_runtime64 = __toESM(require_jsx_runtime(), 1);
  var AccountBalanceWallet_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime64.jsx)("path", {
  var import_jsx_runtime65 = __toESM(require_jsx_runtime(), 1);
  var AccountCircle_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime65.jsx)("path", {
  var import_jsx_runtime66 = __toESM(require_jsx_runtime(), 1);
  var AdminPanelSettings_default = createSvgIcon([/* @__PURE__ */ (0, import_jsx_runtime66.jsx)("path", {
  }, "0"), /* @__PURE__ */ (0, import_jsx_runtime66.jsx)("path", {
  var import_jsx_runtime67 = __toESM(require_jsx_runtime(), 1);
  var Delete_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime67.jsx)("path", {
  var import_jsx_runtime68 = __toESM(require_jsx_runtime(), 1);
  var Edit_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime68.jsx)("path", {
  var import_jsx_runtime69 = __toESM(require_jsx_runtime(), 1);
  var HowToReg_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime69.jsx)("path", {
  var import_jsx_runtime70 = __toESM(require_jsx_runtime(), 1);
  var Lock_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime70.jsx)("path", {
  var import_jsx_runtime71 = __toESM(require_jsx_runtime(), 1);
  var Login_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime71.jsx)("path", {
  var import_jsx_runtime72 = __toESM(require_jsx_runtime(), 1);
  var Logout_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime72.jsx)("path", {
  var import_jsx_runtime73 = __toESM(require_jsx_runtime(), 1);
  var PersonAdd_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime73.jsx)("path", {
  var import_jsx_runtime74 = __toESM(require_jsx_runtime(), 1);
  var SwapHoriz_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime74.jsx)("path", {
  var refreshTokenValue = "";
  var tokenRefreshHandler = null;
  function setRefreshToken(token2) {
    refreshTokenValue = token2;
  }
  function setTokenRefreshHandler(handler) {
    tokenRefreshHandler = handler;
  }
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.config && error.response && error.response.status === 401 && refreshTokenValue && !error.config.__isRetryRequest && !error.config.url.includes("/login") && !error.config.url.includes("/refresh")) {
        error.config.__isRetryRequest = true;
        try {
          const res = await api.post("/refresh", { refreshToken: refreshTokenValue });
          const newToken = res.data.token;
          if (tokenRefreshHandler) tokenRefreshHandler(newToken);
          setAuthToken(newToken);
          return api.request(error.config);
        } catch (err) {
        }
      }
      return Promise.reject(error);
    }
  );
    const [refreshToken, setRefreshTokenState] = (0, import_react11.useState)(() => localStorage.getItem("refreshToken") || "");
    (0, import_react11.useEffect)(() => {
      setRefreshToken(refreshToken);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        localStorage.removeItem("refreshToken");
      }
    }, [refreshToken]);
    (0, import_react11.useEffect)(() => {
      setTokenRefreshHandler((newToken) => setTokenState(newToken));
    }, []);
      setRefreshTokenState(res.data.refreshToken);
    const logout = async () => {
      if (refreshToken) {
        try {
          await api_default.post("/logout", { refreshToken });
        } catch (e) {
        }
      }
      setRefreshTokenState("");
    const refreshAuth = async () => {
      if (!refreshToken) return;
      const res = await api_default.post("/refresh", { refreshToken });
      setTokenState(res.data.token);
    };
    return /* @__PURE__ */ import_react11.default.createElement(AuthContext.Provider, { value: { token: token2, login, logout, refreshAuth, setToken: setTokenState, currentOrg, setCurrentOrg: setCurrentOrgState } }, children);
    return /* @__PURE__ */ import_react13.default.createElement(Box_default, null, /* @__PURE__ */ import_react13.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Profile"), /* @__PURE__ */ import_react13.default.createElement(Button_default, { variant: "contained", onClick: load, sx: styles6.mb2 }, "Load"), profile && /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, profile.profilePicture && /* @__PURE__ */ import_react13.default.createElement("img", { src: profile.profilePicture, alt: "profile", width: 100 }), /* @__PURE__ */ import_react13.default.createElement("pre", null, JSON.stringify(profile, null, 2))));
    const [file, setFile] = (0, import_react14.useState)(null);
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (file) data.append("profilePicture", file);
      await api_default.patch("/profile", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    return /* @__PURE__ */ import_react14.default.createElement(Box_default, null, /* @__PURE__ */ import_react14.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Update Profile"), /* @__PURE__ */ import_react14.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, ["username", "firstName", "lastName"].map((f) => /* @__PURE__ */ import_react14.default.createElement(TextField_default, { key: f, label: f, value: form[f], onChange: (e) => setForm({ ...form, [f]: e.target.value }) })), /* @__PURE__ */ import_react14.default.createElement(Button_default, { variant: "contained", component: "label" }, "Upload Picture", /* @__PURE__ */ import_react14.default.createElement("input", { type: "file", hidden: true, onChange: (e) => setFile(e.target.files[0]) })), /* @__PURE__ */ import_react14.default.createElement(Button_default, { variant: "contained", onClick: submit }, "Submit")));
    const [token2, setToken] = (0, import_react16.useState)("");
      await api_default.post(`/invites/${inviteId}/accept`, { token: token2 });
    return /* @__PURE__ */ import_react16.default.createElement(Box_default, null, /* @__PURE__ */ import_react16.default.createElement(Typography_default, { variant: "h6", gutterBottom: true }, "Accept Invite"), /* @__PURE__ */ import_react16.default.createElement(Stack_default, { spacing: 2, sx: styles6.formStack }, /* @__PURE__ */ import_react16.default.createElement(TextField_default, { label: "invite id", value: inviteId, onChange: (e) => setInviteId(e.target.value) }), /* @__PURE__ */ import_react16.default.createElement(TextField_default, { label: "token", value: token2, onChange: (e) => setToken(e.target.value) }), /* @__PURE__ */ import_react16.default.createElement(Button_default, { variant: "contained", onClick: submit }, "Submit")));
    return /* @__PURE__ */ import_react26.default.createElement(BrowserRouter, null, /* @__PURE__ */ import_react26.default.createElement(Box_default, { sx: styles6.root }, /* @__PURE__ */ import_react26.default.createElement(CssBaseline_default, null), /* @__PURE__ */ import_react26.default.createElement(AppBar_default, { position: "fixed", sx: styles6.appBar }, /* @__PURE__ */ import_react26.default.createElement(Toolbar_default, null, /* @__PURE__ */ import_react26.default.createElement(Typography_default, { variant: "h6", noWrap: true, component: "div", sx: { flexGrow: 1 } }, "Auth Dashboard"), token2 && profile && /* @__PURE__ */ import_react26.default.createElement(Typography_default, { sx: { mr: 2, display: "flex", alignItems: "center" } }, profile.profilePicture && /* @__PURE__ */ import_react26.default.createElement(Avatar_default, { src: profile.profilePicture, sx: { width: 32, height: 32, mr: 1 } }), profile.firstName, " ", profile.lastName, " | ", profile.username, " | Balance: ", profile.balance), token2 && /* @__PURE__ */ import_react26.default.createElement(FormControl_default, { size: "small", sx: { minWidth: 120 } }, /* @__PURE__ */ import_react26.default.createElement(InputLabel_default, { id: "org-select-label" }, "Org"), /* @__PURE__ */ import_react26.default.createElement(
