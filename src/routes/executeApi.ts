import { Router, Request, Response } from "express";
import { runTestCases } from "../utils/runTestCases";
import { validateCode } from "../utils/validateCode";

const router = Router();

router.post("/api/execute", async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, code, problemId } = req.body;
    
    // Validate all required parameters exist
    if (!language || !problemId) {
      res.status(400).json({ 
        success: false, 
        message: "Missing required parameters. Please provide language and problemId." 
      });
      return;
    }
    
    // Check if code exists before validating it
    if (code === undefined || code === null) {
      res.status(400).json({ 
        success: false, 
        message: "Code parameter is missing or invalid" 
      });
      return;
    }
    
    // Now validate the code for malicious content
    if (validateCode(code)) {
      res.status(400).json({ 
        success: false, 
        message: "Malicious code detected" 
      });
      return;
    }
    
    // Execute the code against test cases
    const output = await runTestCases(language, code, problemId);
    res.status(200).json({ success: true, output });
    console.log(output);
  } catch (err: any) {
    console.error("Error executing code:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error", 
      error: err.message 
    });
  }
});

export default router;
