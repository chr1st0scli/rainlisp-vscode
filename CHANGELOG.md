# Change Log

All notable changes to the "rainlisp-vscode" extension will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

Semantic versioning is followed.

## [Unreleased]

### Added

### Fixed

### Changed

### Removed

## [0.5.0] - 2025-07-26

### Added
- Support the `at-list` library procedure that returns a list item at a given position.
- Support the `at-stream` library procedure that returns a stream item at a given position.

## [0.4.0] - 2025-02-23

### Added
- Support the `delay` special form for creating delayed expressions.
- Support the `force` library procedure to force the evaluation of a delayed expression.
- Support the `cons-stream` derived expression for creating infinite streams.
- Support the `cdr-stream` library procedure to enable walking through a stream.
- Support the `make-range-stream` library procedure to make a numerical range stream.
- Support the `map-stream` library procedure that projects elements of a stream.
- Support the `filter-stream` library procedure that filters elements of a stream.

## [0.3.0] - 2024-07-06

### Added
- Support for new `parse-number-culture` primitive procedure.

## [0.2.0] - 2024-02-04

### Added
- Support for new `ceiling` and `floor` primitive procedures.

## [0.1.1] - 2023-07-20

### Changed
- Documentation.

## [0.1.0] - 2023-07-11

### Added
- Code completion.
- Information on mouse hover.
- Procedure signature help.

### Fixed
- Syntax highlighting works even if user chooses to use a theme different than RainLisp.

## [0.0.2] - 2023-06-19

### Fixed
- RainLisp Theme is now based on VSCode dark theme, so that it does not cancel out the default theme options for other languages.

### Changed
- The default evaluation key binding changes from Ctrl + F5 to Ctrl + F12, so that the default VSCode *Run Without Debugging* key binding is respected.

## [0.0.1] - 2023-06-18

Initial release.
