import { Router, Request, Response } from "express";
import { runTestCases } from "../utils/runTestCases";
import { validateCode } from "../utils/validateCode";

const router: Router = Router();

router.post("/api/execute", (req: Request, res: Response): void => {
  const { language, code } = req.body as { language: string; code: string };

  if (validateCode(code)) {
    res.status(400).json({ success: false, message: "Malicious code detected" });
    return;
  }

  runTestCases(language, code);
  res.json({ success: true, message: "Code execution started" });
});

export default router;
