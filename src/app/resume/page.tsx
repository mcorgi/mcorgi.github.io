const RESUME_PATH = "/resume.pdf";

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-10 pb-16">
      <div className="flex items-baseline justify-between gap-4 mb-4 font-mono text-[13px]">
        <h1 className="display text-3xl sm:text-4xl">Resume</h1>
        <a
          href={RESUME_PATH}
          download
          className="underline decoration-pink underline-offset-4 hover:text-accent"
        >
          download pdf
        </a>
      </div>
      <object
        data={RESUME_PATH}
        type="application/pdf"
        className="w-full h-[85vh] rounded-lg border-[1.5px] border-line bg-white"
      >
        <p className="p-6 text-center font-mono text-sm">
          Your browser can&apos;t show PDFs inline.{" "}
          <a href={RESUME_PATH} className="underline decoration-pink underline-offset-2">
            Open the resume
          </a>
          .
        </p>
      </object>
    </div>
  );
}
