const rootStyles = getComputedStyle(document.documentElement);

const useCssRootColor = (cssVariableName) => {
    return rootStyles.getPropertyValue(cssVariableName).trim() || '';
};

export default useCssRootColor;