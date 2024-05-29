import MainContainer from "../../components/MainContainer";
export const MortgagePage = () => {
  return (
    <MainContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/pato-duck.gif"
          alt="pato-duck"
          style={{ width: "350px", maxWidth: "75%", height: "auto" }}
        />
        <h2 style={{ textAlign: "center" }}>
          ❤️ Cuando vuelvas a necesitar comprobar las citas, te volveré a
          activar la página 🦆
        </h2>
      </div>
    </MainContainer>
  );
};
