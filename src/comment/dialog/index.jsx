import styles from "./index.module.scss";
function Dialog({ callDialog, params, children }) {
  const { title, sureSpan, cancelSpan } = params;
  const { onClose, onSure } = callDialog;
  return (
    <div className={styles.dialog}>
      <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <div className={styles.dialogTitle}>
            <span>{title}</span>
          </div>
        </div>
        <div className={styles.dialogBody}>{children}</div>
        <div className={styles.dialogFooter}>
          <div className={styles.dialogFooterLeft} onClick={onClose}>
            <span>{cancelSpan}</span>
          </div>
          <div className={styles.dialogFooterRight} onClick={onSure}>
            <span>{sureSpan}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
