export const getGlobalInfo = state => state.globalInfo;
export const getBg = state => state.globalInfo.bg;
export const getSite = state => state.globalInfo.site;
export const getProject = state => state.globalInfo.target_project;
export const getPeriodStart = state =>
  state.globalInfo.period_start || new Date();

export const getPeriodType = state => state.globalInfo.period_type;
export const getUnit = state => state.globalInfo.unit;
export const getBenchmark = state => state.globalInfo.benchmark;
export const getTypeDate = state => state.globalInfo.typedate;

// export const getVersion = state => state.globalInfo.version;