export default function ErrorBoundary(props) {
  let isEverythingOk = true;

  const OopsText = () => <h2>Oops, something went wrong</h2>;

  return <>{isEverythingOk ? props.children : <OopsText />}</>;
}
