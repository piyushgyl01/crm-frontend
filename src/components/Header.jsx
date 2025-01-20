import BasicPopover from "./AddButton";

export default function Header({ heading }) {
  return (
    <>
      <header>
        <div className="p-3 border-bottom d-flex justify-content-between">
          <h1 className=" ">{heading}</h1>
          <BasicPopover />
        </div>
      </header>
    </>
  );
}
