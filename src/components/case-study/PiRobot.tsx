import Link from "next/link";
import { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { robotSections } from "@/data/siteMap";
import { Callout, Card, Code, LinkList, Pre, Prose, Section, SectionNav, Stat, Steps, Table } from "./Parts";
import RobotDemo, { PiTftSnapshot } from "./RobotDemo";

// One button per motor walks this loop, so 2 buttons cover 6 commands.
const cycle = [
  { label: "clockwise", className: "bg-accent text-cream" },
  { label: "stop", className: "bg-cream-2 text-ink" },
  { label: "counter-clockwise", className: "bg-pink text-cream" },
  { label: "stop", className: "bg-cream-2 text-ink" },
];

export default function PiRobot({ project: p }: { project: Project }) {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-10 pb-24">
      <Reveal>
        <div className="flex items-center gap-2 font-mono text-[14px] text-muted">
          <Link href="/projects" className="hover:text-accent">
            ← projects
          </Link>
          <span>/</span>
          <span>{p.slug}</span>
        </div>
      </Reveal>

      {/* HERO */}
      <div className="mt-6 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center [&>*]:min-w-0">
        <Reveal>
          <div className="font-mono text-[14px] text-muted mb-3 flex flex-wrap items-center gap-2">
            <span className="tag !py-0.5 !px-2 text-[14px]">lab 3</span>
            <span>· {p.org}</span>
            <span>· {p.year}</span>
            <span>· {p.readTime}</span>
          </div>
          <h1 className="display text-[44px] sm:text-[68px] leading-[0.95]">
            Raspberry Pi <span className="text-accent">Robot</span>
          </h1>
          <p className="mt-4 max-w-xl font-sans text-[17px] leading-relaxed text-ink-soft">
            A two-wheeled robot built on a Raspberry Pi. It runs on its own batteries, boots
            straight into a touchscreen control panel, and drives a test pattern until you stop it.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[14px]">
            <li><span className="text-accent">▸</span> Raspberry Pi · Python · RPi.GPIO · pygame</li>
            <li><span className="text-accent">▸</span> TB6612FNG motor driver</li>
            <li><span className="text-accent">▸</span> 2 weeks</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#play" className="arrow-link text-sm font-mono !bg-navy !text-cream">
              ▶ drive it in your browser
            </a>
            <a href="#stop" className="arrow-link text-sm font-mono">
              the stop trap ↓
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pi-robot/robot.jpg"
              alt="The robot from above: a Raspberry Pi with a piTFT touchscreen showing the control panel, two yellow gearmotors with black wheels, and a breadboard with the red TB6612 motor driver, resistors and a lit blue LED, on a clear acrylic base."
              className="block w-full aspect-[4/5] object-cover object-[50%_35%] rounded-lg border-[1.5px] border-line shadow-[6px_6px_0_0_var(--accent-3)]"
            />
            <figcaption className="mt-3 font-sans text-[15px] text-muted">
              On the bench, 115 seconds after run_test.py started: it has just finished backing up.
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat value="50 Hz" label="PWM on each motor, a 20 ms period" />
          <Stat value="2" label="buttons for six motor commands" />
          <Stat value="50 ms" label="one pass of the main loop: buttons, touch, motors, redraw" />
          <Stat value="0" label="cables while it runs: no power cord, network, keyboard, mouse or monitor" />
        </div>
      </Reveal>

      <SectionNav items={robotSections} />

      {/* OVERVIEW */}
      <Section id="overview" eyebrow="what it is" title="From one LED to a robot that runs itself.">
        <Prose>
          <p>
            Lab 3 of Cornell&apos;s ECE 5725 (Design with Embedded Operating Systems) builds a robot
            one piece at a time. It starts with a blinking LED on a GPIO pin and ends with a
            self-contained robot: a Raspberry Pi, a small touchscreen called the piTFT, two DC motors
            and a motor driver on an acrylic chassis, with batteries for everything. Switch it on and
            it starts its own control program.
          </p>
          <p>Each step was its own Python program, and each one reused pieces of the last:</p>
        </Prose>
        <Steps
          items={[
            <>
              <strong>blink.py</strong> blinks an LED from a thread. You can type a new frequency
              while it runs, and a <Code>threading.Event</Code> wakes the thread right away instead
              of waiting out the old period.
            </>,
            <>
              <strong>blink_pwm.py</strong> does the same with RPi.GPIO&apos;s PWM, which keeps
              running in the background, so the thread goes away.
            </>,
            <>
              <strong>motor_control.py</strong> steps one motor through stopped, half and full speed
              in each direction, 3 seconds each, and prints the frequency, pulse width, duty cycle and
              direction pins at every step to check against the oscilloscope.
            </>,
            <>
              <strong>two_wheel.py</strong> drives both motors from the piTFT&apos;s buttons.
            </>,
            <>
              <strong>rolling_control.py</strong> adds a touchscreen control panel: each motor&apos;s
              state, its recent history, a panic stop and a quit button.
            </>,
            <>
              <strong>run_test.py</strong> runs a test pattern at full speed on the assembled robot,
              and starts by itself at boot.
            </>,
          ]}
        />
        <Credit>
          The requirements, wiring diagrams and robot kit come from the ECE 5725 course staff. The
          course code isn&apos;t public, so this page explains how it works with short excerpts.
        </Credit>
      </Section>

      {/* PLAY */}
      <Section
        id="play"
        eyebrow="try it"
        title="Drive it here."
        intro={
          <>
            A browser version of run_test.py, written for this page. Press START and the robot runs
            the same eight-step loop: forward 2 s, stop 1 s, back 2 s, stop, pivot left 2 s, stop,
            pivot right 2 s, stop, and around again. Try PANIC STOP partway through a move, then
            RESUME.
          </>
        }
      >
        <RobotDemo />
      </Section>

      {/* HARDWARE */}
      <Section
        id="hardware"
        eyebrow="hardware"
        title="What's on the chassis."
        intro="Everything rides on one acrylic base: the Pi and piTFT over the two motors, a breadboard with the motor driver in the middle, and a caster at the far end. A ribbon cable carries the Pi's GPIO pins down to the breadboard."
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Card title="Raspberry Pi + piTFT" tag="brain">
            <p>
              The Pi runs the control program. The piTFT is a 320×240 resistive touchscreen that sits
              on the Pi&apos;s header, with four buttons on GPIO 17, 22, 23 and 27. pygame draws the
              interface.
            </p>
          </Card>
          <Card title="TB6612FNG motor driver" tag="muscle">
            <p>
              A GPIO pin can&apos;t power a motor, so a dual H-bridge does it. Each motor gets two
              direction pins and one PWM speed pin, and the driver switches battery power to match.
            </p>
          </Card>
          <Card title="Two DC gearmotors" tag="wheels">
            <p>
              Yellow 1:48 gearmotors rated for 3 to 6 V, about 200 RPM at 6 V with no load. A caster
              at the back keeps the base level.
            </p>
          </Card>
          <Card title="Two batteries" tag="untethered">
            <p>
              A 6 V battery pack under the base powers the motors and a 5 V phone battery powers the
              Pi, so motor current never comes out of the Pi&apos;s supply. The grounds are all tied
              together.
            </p>
          </Card>
        </div>
        <Table
          head={["Signal", "Left motor (channel A)", "Right motor (channel B)"]}
          rows={[
            ["PWM (speed)", "GPIO 26", "GPIO 16"],
            ["IN1 (direction)", "GPIO 5", "GPIO 12"],
            ["IN2 (direction)", "GPIO 6", "GPIO 19"],
          ]}
        />
        <Prose>
          <p>
            Every GPIO line to the driver goes through a 1 kΩ resistor, so a wiring mistake
            can&apos;t pull too much current from a pin. An LED stays on GPIO 26 next to the left
            motor&apos;s PWM line. It dims and brightens with the duty cycle, a quick way to see that
            PWM is running before the motors have power.
          </p>
        </Prose>
      </Section>

      {/* STOP */}
      <Section
        id="stop"
        eyebrow="the tricky part"
        title="Stopping isn't 0%."
        intro="The obvious way to stop a PWM-driven motor is to set the duty cycle to zero. On the TB6612, that's a different command."
      >
        <Prose>
          <p>
            The driver&apos;s truth table has two ways of not moving. With a direction set and the PWM
            pin low, it&apos;s a <strong>short brake</strong>: the motor&apos;s two terminals are
            connected, and it resists turning. The <strong>stop</strong> the lab asks for is both
            direction pins low with PWM high, which leaves the motor free. So in my code a stopped
            motor has its PWM at 100%. That looks backwards until you read the table.
          </p>
        </Prose>
        <Table
          head={["Command", "IN1", "IN2", "PWM"]}
          rows={[
            ["Clockwise", "H", "L", "H (or a duty cycle)"],
            ["Counter-clockwise", "L", "H", "H (or a duty cycle)"],
            ["Short brake", "H or L", "L or H", "L"],
            [<span key="s">Stop <span className="text-accent font-normal">← what “stopped” means here</span></span>, "L", "L", "H"],
          ]}
        />
        <Pre title="set_motor(), shared by every program after two_wheel.py">{`def set_motor(in1, in2, pwm, state):
    if state == "clockwise":
        GPIO.output(in1, GPIO.HIGH)
        GPIO.output(in2, GPIO.LOW)
        pwm.ChangeDutyCycle(SPEED)

    elif state == "counter-clockwise":
        GPIO.output(in1, GPIO.LOW)
        GPIO.output(in2, GPIO.HIGH)
        pwm.ChangeDutyCycle(SPEED)

    else:
        GPIO.output(in1, GPIO.LOW)
        GPIO.output(in2, GPIO.LOW)
        pwm.ChangeDutyCycle(100)    # stop needs PWM high`}</Pre>
        <Prose>
          <p>
            At 50 Hz each PWM period is 20 ms, and the duty cycle is how much of it the pin spends
            high. These are the settings motor_control.py prints at each step, to compare against the
            oscilloscope:
          </p>
        </Prose>
        <Table
          head={["Step", "IN1", "IN2", "Duty cycle", "Pulse width"]}
          rows={[
            ["Clockwise, half speed", "H", "L", "50%", "10 ms"],
            ["Clockwise, full speed", "H", "L", "100%", "20 ms"],
            ["Stopped", "L", "L", "100%", "20 ms"],
            ["Counter-clockwise, half speed", "L", "H", "50%", "10 ms"],
            ["Counter-clockwise, full speed", "L", "H", "100%", "20 ms"],
          ]}
        />
      </Section>

      {/* BUTTONS */}
      <Section
        id="buttons"
        eyebrow="input"
        title="Two buttons, six commands."
        intro="two_wheel.py had to give each motor clockwise, stop and counter-clockwise: six commands. The lab hinted that it didn't need six buttons."
      >
        <Reveal>
          <div className="border-t-[1.5px] border-line pt-4">
            <div className="font-mono text-[14px] text-ink mb-3">each press of a motor&apos;s button</div>
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[14px]">
              {cycle.map((c, i) => (
                <span key={i} className="inline-flex items-center gap-2.5">
                  <span className={`rounded-md border-[1.5px] border-line px-3 py-2 ${c.className}`}>{c.label}</span>
                  <span className="text-muted">{i < cycle.length - 1 ? "→" : "↺"}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <Prose>
          <p>
            Each motor gets one button that steps through clockwise, stop, counter-clockwise, stop,
            and around again, so a press never flips a spinning motor straight into reverse. The two
            stops aren&apos;t quite the same state, though: the program has to know which direction
            comes next. two_wheel.py keeps them apart as <Code>stop A</Code> and{" "}
            <Code>stop B</Code>; the later programs keep an index into the four-step list instead.
            That leaves GPIO 23 to stop both motors and GPIO 27 to quit.
          </p>
          <p>
            <strong>One press is one step.</strong>{" "}The buttons are polled in the main loop. When one
            reads low (pressed), the program acts, waits for the button to be released, then waits
            another 50 ms for the contacts to settle, so holding a button or a bouncing contact
            can&apos;t skip a state.
          </p>
        </Prose>
      </Section>

      {/* SCREEN */}
      <Section
        id="screen"
        eyebrow="the interface"
        title="A control panel on a 320×240 screen."
        intro="rolling_control.py puts the motors on the piTFT. Each motor's state is across the top, and under it the three most recent changes, with the second each one happened, counted from when the program started."
      >
        <Reveal>
          <figure className="max-w-md">
            <div className="rounded-xl border-[1.5px] border-line bg-navy p-3 shadow-[6px_6px_0_0_var(--accent-3)]">
              <PiTftSnapshot />
            </div>
            <figcaption className="mt-3 font-sans text-[15px] text-muted">
              The screen 9 seconds into a test run, redrawn from run_test.py&apos;s own 320×240
              coordinates.
            </figcaption>
          </figure>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card title="Panic stop" tag="red → green">
            <p>
              Stops both motors immediately and turns into a green RESUME button. The program saves
              what each motor was doing, and RESUME puts it back. While it&apos;s stopped, the
              physical buttons are ignored, so only RESUME can start the motors again.
            </p>
          </Card>
          <Card title="History" tag="3 per motor">
            <p>
              A new entry only when a motor&apos;s state actually changes, newest on top. Stopping a
              motor that&apos;s already stopped doesn&apos;t push anything off the list.
            </p>
          </Card>
          <Card title="Two ways to quit" tag="touch + GPIO 27">
            <p>
              A QUIT button on the screen and a physical button on GPIO 27. The cleanup sits in a{" "}
              <Code>finally</Code> block, so every way out, Ctrl-C included, stops both motors and
              releases the GPIO pins.
            </p>
          </Card>
          <Card title="Upside-down touches" tag="319 − x">
            <p>
              The touchscreen reported coordinates rotated 180° from the picture. A test program from
              Lab 2 printed raw touches, and the fix is one line: x becomes 319 − x and y becomes
              239 − y.
            </p>
          </Card>
        </div>
      </Section>

      {/* LOOP */}
      <Section
        id="loop"
        eyebrow="the real-time part"
        title="A loop that never sleeps through a stop."
        intro="run_test.py drives the assembled robot through a fixed pattern at 99% duty cycle, over and over, with the same control panel on top. The simplest version is a list of moves with time.sleep() between them."
      >
        <Pre title="the obvious version">{`forward();     time.sleep(2)
stop();        time.sleep(1)
backward();    time.sleep(2)
stop();        time.sleep(1)
pivot_left();  time.sleep(2)
...`}</Pre>
        <Prose>
          <p>
            That works until you need to stop. During a two-second sleep nothing else runs: the screen
            doesn&apos;t redraw, touches aren&apos;t read, and the panic button does nothing until the
            move is over. On a robot, that&apos;s the button that matters most.
          </p>
          <p>
            So the pattern is data instead: a table of steps, each saying what the two motors do and
            for how long. The main loop runs every 50 ms like the control panel&apos;s, and one of its
            jobs is to check whether the current step has run its time.
          </p>
        </Prose>
        <Pre title="run_test.py: the pattern, and the check the loop makes every pass">{`SEQUENCE = [
    ("forward",     "clockwise",         "clockwise",         2),
    ("stop",        "stopped",           "stopped",           1),
    ("backward",    "counter-clockwise", "counter-clockwise", 2),
    ("stop",        "stopped",           "stopped",           1),
    ("pivot left",  "counter-clockwise", "clockwise",         2),
    ("stop",        "stopped",           "stopped",           1),
    ("pivot right", "clockwise",         "counter-clockwise", 2),
    ("stop",        "stopped",           "stopped",           1),
]

def run_sequence():
    # move on to the next step when the current one has run its time
    if not started or panicked:
        return

    if time.time() >= step_end_time:
        start_step((step + 1) % len(SEQUENCE))   # wrap back to the top`}</Pre>
        <Prose>
          <p>
            Panic stop now takes effect on the next pass of the loop. It also saves how much of the
            current step was left, and RESUME restarts that step for only the remaining time, so a
            forward move that got interrupted still adds up to two seconds.
          </p>
          <p>
            The robot doesn&apos;t move until you press START, which gives you time to set it down
            after it boots. And there are three ways out: the QUIT button, GPIO 27, and a 120-second
            timeout, so a robot nobody is watching can&apos;t drive around forever.
          </p>
        </Prose>
      </Section>

      {/* BOOT */}
      <Section
        id="boot"
        eyebrow="embedded linux"
        title="Power on, robot starts."
        intro="The finished robot has nothing plugged in: no power cord, network cable, keyboard, mouse or monitor. So run_test.py has to start by itself when the Pi boots."
      >
        <div className="grid md:grid-cols-2 gap-6 [&>*]:min-w-0">
          <Pre title="crontab -e">{`@reboot /home/pi/lab3/run_test.sh`}</Pre>
          <Pre title="run_test.sh">{`#!/bin/bash
# give the piTFT and touchscreen a few
# seconds to come up after boot
sleep 10

cd /home/pi/lab3

# no terminal under cron, so log to a file
/usr/bin/python3 /home/pi/lab3/run_test.py \\
    > /home/pi/lab3/run_test.log 2>&1`}</Pre>
        </div>
        <Prose>
          <p>
            The lab offered three ways to do this: cron, <Code>.bashrc</Code> with automatic login, or{" "}
            <Code>/etc/rc.local</Code>. I used cron, the one the lab recommends. Nobody has to log
            in, and it doesn&apos;t hold up the rest of the boot.
          </p>
          <p>
            Running from cron changes a few things. There&apos;s no terminal, so everything
            run_test.py prints goes to <Code>run_test.log</Code>, the only record of what happened.
            Cron starts it early, so the script gives the piTFT 10 seconds to be ready first. And
            every path is absolute, since cron runs with almost none of a login shell&apos;s
            environment.
          </p>
        </Prose>
      </Section>

      {/* LEARNED */}
      <Section id="learned" eyebrow="takeaways" title="What I learned.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Card title="Read the truth table">
            <p>
              0% duty cycle isn&apos;t stop on this driver. Stopping is its own state, and the
              datasheet says which pins make it.
            </p>
          </Card>
          <Card title="Never block the stop button">
            <p>
              Turning timed moves into a table that the main loop checks kept panic stop working
              mid-move. A sleep would have hidden it for up to two seconds.
            </p>
          </Card>
          <Card title="Boot has no terminal">
            <p>
              A program started by cron needs a log file, absolute paths, and a moment for the
              hardware to come up.
            </p>
          </Card>
          <Card title="Build in layers">
            <p>
              The motor and history functions from rolling_control.py went into run_test.py
              unchanged, so the last step was mostly writing the sequencer.
            </p>
          </Card>
        </div>
        <Callout>
          What I&apos;d change: those shared functions are copied from file to file. Next time
          they&apos;d live in one module that every program imports, so a fix only has to happen
          once.
        </Callout>
      </Section>

      <Section id="stack" eyebrow="built with" title="Stack.">
        <div className="flex flex-wrap gap-2">
          {p.stack?.map((s) => (
            <span key={s} className="tag font-mono">
              {s}
            </span>
          ))}
        </div>
      </Section>

      <LinkList links={p.links} />

      <div className="mt-20 flex items-center justify-between">
        <Link href="/projects" className="arrow-link text-sm font-mono">
          ← all projects
        </Link>
        <Link href="/" className="arrow-link text-sm font-mono">
          home ↗
        </Link>
      </div>
    </div>
  );
}

// Small attribution text.
function Credit({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className="max-w-3xl font-mono text-[14px] leading-relaxed text-muted">{children}</p>
    </Reveal>
  );
}
