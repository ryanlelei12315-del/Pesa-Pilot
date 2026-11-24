import { describe, it, expect } from "vitest";
import { parseMpesaSms } from "./mpesa-parser";
import { classifyTransaction } from "../financial-engine/classification";

describe("M-Pesa SMS Parser & Classification Engine", () => {
  it("should parse standard Safaricom Lipa na M-Pesa till / paybill format", () => {
    const sms = "QK910248P0 Confirmed. Ksh 650.00 paid to CAMPUS CAFETERIA on 24/11/26 at 1:12 PM. New M-PESA balance is Ksh 13,850.00. Transaction cost, Ksh 0.00.";
    const result = parseMpesaSms(sms);

    expect(result).not.toBeNull();
    expect(result?.transactionCode).toBe("QK910248P0");
    expect(result?.amount).toBe(65000); // 650 KSh in cents
    expect(result?.transactionType).toBe("EXPENSE");
    expect(result?.counterparty).toBe("CAMPUS CAFETERIA");
    expect(result?.balance).toBe(1385000);

    const category = classifyTransaction(result!.rawMessageReference, result!.counterparty);
    expect(category).toBe("FOOD");
  });

  it("should parse peer-to-peer / matatu send money format", () => {
    const sms = "QK940121L9 Confirmed. Ksh 250.00 sent to 0712345678 JOHN MATATU on 24/11/26 at 8:40 AM. New M-PESA balance is Ksh 13,600.00.";
    const result = parseMpesaSms(sms);

    expect(result).not.toBeNull();
    expect(result?.transactionCode).toBe("QK940121L9");
    expect(result?.amount).toBe(25000);
    expect(result?.transactionType).toBe("EXPENSE");
    expect(result?.counterparty).toContain("JOHN MATATU");

    const category = classifyTransaction(result!.rawMessageReference, result!.counterparty);
    expect(category).toBe("TRANSPORT");
  });

  it("should parse incoming money / freelance payment", () => {
    const sms = "QK955102X4 Confirmed. You have received Ksh 3,000.00 from PETER OMONDI on 24/11/26 at 11:20 AM. New M-PESA balance is Ksh 12,100.00.";
    const result = parseMpesaSms(sms);

    expect(result).not.toBeNull();
    expect(result?.transactionCode).toBe("QK955102X4");
    expect(result?.amount).toBe(300000);
    expect(result?.transactionType).toBe("INCOME");
    expect(result?.counterparty).toBe("PETER OMONDI");
  });

  it("should return null for invalid or failed messages", () => {
    expect(parseMpesaSms("Failed transaction. Insufficient funds")).toBeNull();
    expect(parseMpesaSms("Random unrelated message from friend")).toBeNull();
  });
});
