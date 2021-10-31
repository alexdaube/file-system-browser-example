import RootDirectory from '../directory/RootDirectory';
import { Router } from 'express';
const router = Router();

router.get('/directory', async (req, res) => {
  try {
    const directoryParam: string | undefined = req.query.dir as string;

    const directory = await RootDirectory.getDirectoryInfo(
      directoryParam ? directoryParam : RootDirectory.rootDirectoryPath,
    );

    res.json(directory);
  } catch (e) {
    // NOOP
  }
});

export default router;
