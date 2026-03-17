// controllers/authController.js
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  const { email, password, role, adminCode } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'ADMIN') {
      // 1. Validate Admin Code
      if (!adminCode) {
        return res.status(400).json({ error: "Admin code required for this role." });
      }

      const validCode = await prisma.admin_ID.findUnique({ where: { code: adminCode } });
      
      if (!validCode || validCode.isUsed) {
        return res.status(403).json({ error: "Invalid or expired Admin ID." });
      }

      // 2. Create Admin & invalidate code in a transaction
      const newAdmin = await prisma.$transaction([
        prisma.user.create({
          data: { email, password: hashedPassword, role: 'ADMIN' }
        }),
        prisma.admin_ID.update({
          where: { code: adminCode },
          data: { isUsed: true }
        })
      ]);

      return res.status(201).json({ message: "Admin registered successfully." });

    } else {
      // 3. Handle Regular Visitor Registration
      const visitorId = `VIS-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const newUser = await prisma.user.create({
        data: { email, password: hashedPassword, role: 'VISITOR', visitorId }
      });

      return res.status(201).json({ 
        message: "User registered successfully.", 
        visitorId: newUser.visitorId 
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Registration failed." });
  }
};
