---
title: "Build Isolation on a Budget: Orchestrating VMs with GCP Batch"
date: "2025-04-11"
description: "Need to run untrusted build code safely without breaking the bank on VMs? See how Zercel leverages GCP Batch for secure, isolated server builds."
tags:
  ["gcp", "cloud-batch", "ci-cd", "devops", "platform-engineering", "zercel"]
micro: true
hidden: true
---

So, you're building a platform where users push code, and you need to build it. Easy, right? Just spin up a container, run `docker build`, and... wait. What if that build script decides to mine crypto or `rm -rf /` inside your build environment? Building server-side apps that need containerization is tricky. You need isolation, but dedicated VMs for every build get expensive fast.

When I was building [Zercel](https://github.com/Krish120003/zercel) (my Vercel clone experiment), I hit this exact wall. Server builds needed Docker images built _during_ the build process. My initial thought of building Docker-in-Docker with something like Kaniko felt overly complex and potentially insecure if I messed it up.

### VMs Without the Headache

Turns out, GCP has a neat service for this: [GCP Batch](https://cloud.google.com/batch/docs/get-started). It lets you submit batch jobs that run on managed Compute Engine VMs.

Here's the rough flow I implemented:

1.  **Trigger:** GitHub webhook hits my main server on new commits.
2.  **Dispatch:** My server triggers a GCP Batch job. The Batch job definition itself contains all the build logic.
3.  **Isolation:** GCP Batch spins up a temporary, isolated VM instance based on a configuration I defined (like specifying machine type, boot disk, etc.)
4.  **Build:** Inside the VM, the job executes a predefined script. This script checks out the user's code, runs `docker build` using a standardized Dockerfile.
5.  **Push:** The script then pushes the built Docker image to GCP Artifact Registry, tagging it with the commit SHA for versioning.
6.  **Cleanup:** GCP Batch automatically tears down the VM once the job completes (or fails).

### Why Batch?

- I wanted to avoid managing a fleet of VMs - GCP Batch automatically scales and handles their lifecycle for me.
- I required isolated environments with full Docker access, and this approach offered the simplest solution.
- An e2-medium instance costs $0.03350571/hour. The same on Cloud Build? $0.006 per minute. That's $0.36/hour. So Batch is 10x cheaper.

This doesn't mean GCP Batch is the perfect solution. Since batch spins up a new VM, the job startup time is between 2-3 minutes. This is fine for my use case (and really cheap), but if your workload is more latency-sensitive, you might want to consider other options.

### Wrapping Up

GCP Batch turned out to be a sweet spot for handling isolated server builds in Zercel. It provided the necessary security boundary without the cost of dedicated VMs or the complexity of nested container builds. If you're building a platform that needs to execute potentially untrusted code or requires a full VM environment for its build steps, GCP Batch is definitely worth investigating.

Check out the [Zercel repo](https://github.com/Krish120003/zercel) – It's an open-source Vercel clone that I built to learn about serverless platforms.
