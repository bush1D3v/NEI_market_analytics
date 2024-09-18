config:
	bun docker-build && bun docker-run && bun docker-up

clean_snapshots:
	find . -type d -name "__snapshots__" -exec rm -r {} +
