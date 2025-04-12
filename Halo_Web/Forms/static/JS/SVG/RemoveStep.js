function RemoveStep(step, ACT_STEP) {
  UpdateColor("SVG_".concat(step), ACTIVE_COLOR);
  UpdateColor("SVG_".concat(ACT_STEP), PAUSED_COLOR);
}
