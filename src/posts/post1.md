# Installing Ubuntu 16.04 on Dell XPS 15 9550

It seems that there are already some useful blogs on how to do this, but I just want to test it myself and see if it really works.

The Dell model I am using was bought one and half years ago, and still in good condition. Most of the procedures could be found at <https://ubuntuforums.org/showthread.php?t=2317843>, with detailed instructions on what to do at each step. For disk partition, I recommend Mini Tool Partition Wizard on Windows, and Gparted on Linux. I found that even using the former one to manage my Ubuntu partitions worked seamlessly well.

Using the Rufus <https://rufus.akeo.ie/> USB installer, I was able to install Ubuntu 16.04 LTS on my Dell XPS 15 9550 labtop alongside Windows 10 Pro, after following the above procedures. I was surprised that nothing unusual really triggered.

Unlike many posts which suggest to use ppa solutions for the **Nvidia 960m** GPU driver, the official packages work fine. Just install the Nvidia binary driver, along with Nvidia Prime. One thing you may notice is that switching the graphic mode to the Intel one may increase the battery life as much as 2 times as compared to using Nvidia GPU.

### Issues list:

- The wifi did not seem to work after the laptop awakened from sleep. A temporary solution could be found here <http://malachisoord.com/2017/02/18/ubuntu-fix-wifi-after-suspend/>.
- I noticed that after the dual boot installation, my Windows 10 system seems to freeze occasionally, and sometimes I have to shut down the system in order to restart.
- The bluetooth panel shows that it’s working, but in fact it may not be.