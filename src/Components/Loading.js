export default function Loading({ loading }) {
  if (loading)
    return (
      <div
        class="d-flex justify-content-center align-items-center position-absolute vh-100 w-100 loading"
        style={{ backgroundColor: "rgb(0,0,0,0.75)" }}
      >
        <div
          class="spinner-border text-danger"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        ></div>
      </div>
    );
  else return <div></div>;
}
