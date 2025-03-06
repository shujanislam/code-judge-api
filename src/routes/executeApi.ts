import { Router, Request, Response } from "express";
import { runTestCases } from "../utils/runTestCases";
import { validateCode } from "../utils/validateCode";

const router = Router();

router.post("/api/execute", async (req: Request, res: Response): Promise<void> => {
  const { language, code }: { language: string; code: string } = req.body;

  if (validateCode(code)) {
    res.status(400).json({ success: false, message: "Malicious code detected" });
    return;
  }

  try {
    const output = await runTestCases(language, code);
    res.status(200).json({ success: true, output });
    console.log(output);
  } catch (err: any) {
    console.error("Error executing code:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
});

export default router;
