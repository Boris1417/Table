import "./CheckBox.scss";

export const Checkbox = ({ label, color, checked, onChange }) => {
  return (
    <div className="container_checkbox">
      <div
        className="color"
        style={{
          backgroundColor: color,
        }}
      />

      <span>{label}</span>

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="input"
      />
    </div>
  );
};
