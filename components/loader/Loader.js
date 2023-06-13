import styles from "./loader.module.scss";

// Component responsible for rendering a loader
export default function Loader({ back }) {
  return (
    <div className={back ? styles.loader_back : ""}>
      <div className={styles.loader}>
        {/* Render the loader SVG */}
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
        </svg>
      </div>
    </div>
  );
}
