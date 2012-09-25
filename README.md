# runn

A simple ipad-friendly web app to manage my marathon training schedule (angularjs, couchdb, node, jake)

---

I store and serve my app through my document database. My entire angular application is one document with attachements. I deploy to my test environement using curl -X PUT. It creates a new revision of my app. All my application versions are available as different revisions. I can rollback my deployment in a snap. I deploy to other environements (like production) by replication. 